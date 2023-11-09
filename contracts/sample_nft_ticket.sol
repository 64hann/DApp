
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nfticket is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 public mintPrice = 0 gwei;
    uint256 private _nextTokenId;
    uint256 public MAX_SUPPLY = 0;
    mapping(address => uint256) public mintedWallets;
    bool public isMintEnabled;
    // New tokens will be automatically assigned an incremental id.
    
    /*
    ERC721Enumerable.sol
    This implements an optional extension of ERC721 defined in the EIP
     that adds enumerability of all the token ids in the contract as well as all token ids owned by each account.
    */
    constructor(address initialOwner)
        ERC721("nfticket", "NTK")
        Ownable(initialOwner)
    {}

    function toggleMintEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }
    function setmintPrice(uint256 mint_price) external  onlyOwner {
        mintPrice = mint_price;
    }
    function setMaxSupply(uint256 max_supply) external onlyOwner {
        MAX_SUPPLY = max_supply;
    }

    function safeMint(address to, string memory uri) public payable  {
        uint256 tokenId = _nextTokenId++;
        require(tokenId < MAX_SUPPLY, "All available NFTs have been minted");
        require(mintedWallets[to] < 6, "Maximum mint reached for user");
        require(msg.value == mintPrice, "Wrong value");

        mintedWallets[to]++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function transferToken(address payable  from, uint256 tokenId) public payable  {
        require(msg.value == mintPrice, "Pls pay the correct amt");
        from.transfer(msg.value);
        _safeTransfer(from, msg.sender, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        // child classes can use these functions
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view // view wont cost any gas, unless being called by smart contract
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

