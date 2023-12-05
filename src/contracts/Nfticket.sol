// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Nfticket is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    ReentrancyGuard
{
    uint256 public mintPrice;
    uint256 private _nextTokenId;
    uint256 public MAX_SUPPLY;
    bool public isMintEnabled;

    // New tokens will be automatically assigned an incremental id.

    /*
    ERC721Enumerable.sol
    This implements an optional extension of ERC721 defined in the EIP
     that adds enumerability of all the token ids in the contract as well as all token ids owned by each account.
    */
    constructor(address initialOwner)
        ERC721("Taylor Swift", "TS")
        Ownable(initialOwner)
    {}

    receive() external payable {}

    fallback() external payable {}

    function transferAll() external onlyOwner {
        payable(this.owner()).transfer(payable(address(this)).balance);
    }

    function getTicketsOwned(address addr)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory results = new uint256[](balanceOf((addr)));
        for (uint256 i; i < balanceOf(addr); i++) {
            results[i] = tokenOfOwnerByIndex(addr, i);
        }
        return results;
    }

    function toggleMintEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    function setmintPrice(uint256 mint_price) external onlyOwner {
        mintPrice = mint_price;
    }

    function setMaxSupply(uint256 max_supply) external onlyOwner {
        MAX_SUPPLY = max_supply;
    }

    function safeMint(
        address to,
        string calldata uri,
        uint256 noOfTickets
    ) public payable nonReentrant {
        for (uint256 i; i < noOfTickets; i++) {
            uint256 tokenId = _nextTokenId++;
            require(isMintEnabled == true, "Minting has not been enabled!");
            require(
                tokenId < MAX_SUPPLY,
                "All available tickets have been minted"
            );
            require(balanceOf(to) < 6, "Maximum tickets reached for user");
            require(msg.value == ( noOfTickets * mintPrice), "Not enough ether");

            _safeMint(to, tokenId);
            _setTokenURI(tokenId, uri);
        }
    }

    // Revised transferToken function
    function transferToken(address payable from, uint256 tokenId)
        public
        payable
        nonReentrant
        returns (uint256)
    {
        require(msg.value == mintPrice, "Please pay the correct amount");
        require(balanceOf(msg.sender) < 6, "Maximum tickets reached for user");

        // First, transfer the NFT
        _safeTransfer(from, msg.sender, tokenId, "");

        // Then, transfer the Ether
        from.transfer(msg.value);

        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(
            // child classes can use these functions
            ERC721,
            ERC721Enumerable
        )
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

    function tokenURI(
        uint256 tokenId // view wont cost any gas, unless being called by smart contract
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
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
