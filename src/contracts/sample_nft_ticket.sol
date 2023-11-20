
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Nftickets is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {

    struct addressInfo {
        uint256 minted;
        uint[] listOfTokens;

    }
    uint256 public mintPrice = 0 wei;
    uint256 private _nextTokenId;
    uint256 public MAX_SUPPLY = 0;
    mapping(address => addressInfo) public mintedWallets;
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

    function getAddressInfo(address addr) public view returns (uint[] memory)  {
        return  mintedWallets[addr].listOfTokens;
    }

        // Function to find and remove an element
    function removeToken(address from, uint tokenId) private  {
        for (uint i = 0; i < mintedWallets[from].listOfTokens.length; i++) {
            if (mintedWallets[from].listOfTokens[i] == tokenId) {
                // Shift elements to the left to overwrite the element to be removed
                for (uint j = i; j < mintedWallets[from].listOfTokens.length - 1; j++) {
                    mintedWallets[from].listOfTokens[j] = mintedWallets[from].listOfTokens[j + 1];
                }
                // Remove the last element (which is a duplicate now)
                mintedWallets[from].listOfTokens.pop();
                return;
            }
        }
    }


    function safeMint(address to, string memory uri) public payable returns (uint256)  {
        uint256 tokenId = _nextTokenId++;
        require(tokenId < MAX_SUPPLY, "All available NFTs have been minted");
        require(mintedWallets[to].minted < 6, "Maximum mint reached for user");
        require(msg.value == mintPrice, "Wrong value");

        mintedWallets[to].minted++;
        mintedWallets[to].listOfTokens.push(tokenId);
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }



    // function transferToken(address payable  from, uint256 tokenId) public payable  {
    //     require(msg.value == mintPrice, "Pls pay the correct amt");
    //     from.transfer(msg.value);
    //     _safeTransfer(from, msg.sender, tokenId);
    // }

    // Revised transferToken function
    function transferToken(address payable from, uint256 tokenId) public payable nonReentrant returns (uint256) {
        require(msg.value == mintPrice, "Please pay the correct amount");
        
        // First, transfer the NFT
        _safeTransfer(from, msg.sender, tokenId, "");

        // Then, transfer the Ether
        from.transfer(msg.value);

        //remove from seller
        removeToken( from, tokenId);
        // add to buyer
        mintedWallets[msg.sender].listOfTokens.push(tokenId);

        return tokenId;

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

