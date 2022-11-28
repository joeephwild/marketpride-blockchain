// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract MarketPride {
    uint256 productCounter;
    uint256 storeCounter;
    address payable buyer;
    bool  storeExist;

    struct Product {
        address buyer;
        address seller;
        uint256 id;
        uint256 price;
        uint256 rating;
        string name;
        string description;
        string category;
        string imgUrl;
    }

    //creating an object of all store
    struct Store {
        string name;
        string description;
        uint256 id;
        address creator;
        string imageUrl;
        string coverImage;
    }

    struct User {
        string name;
        address account;
    }

    struct AllUserStruct{
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers;

    Product[] public products;
    Store[] public store;

    mapping(address => User) userList;
    mapping(uint256 => Product) public product;
    mapping(uint256 => Store) public stores;

    event payment(address indexed _from, address indexed _to, uint256 _price);

    constructor(){
        storeExist == false;
    }

   //check if users exist
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    
    //create an account
    function createAccount(
        string calldata name
        ) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length>0, "Username cannot be empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //create a store
    function createStore(string calldata _name, string calldata _desc, string memory _imageUrl, string memory _coverImage, uint256 _id)
        public
        returns(bool)
    {
        require(checkUserExists(msg.sender) == true, "Accounts need to b created");
        require(bytes(_name).length>0, "Username cannot be empty");
        require(bytes(_desc).length>0, "Username cannot be empty");
        require(bytes(_imageUrl).length>0, "Username cannot be empty");
        require(bytes(_coverImage).length>0, "Username cannot be empty");
        require(store.length<1, "You cant create multiple store");
         Store memory market = Store({
            name: _name,
            description: _desc,
            creator: msg.sender,
            imageUrl: _imageUrl,
            coverImage: _coverImage,
            id: _id
         });
         stores[storeCounter] = market;
         storeCounter++;
         store.push(market);
         return storeExist = true;
    }

    function getIfStoreExist() public view returns(bool){
        return storeExist;
    }

    //list a new set of products in the store for sale
    function listNewProduct(
        address _seller,
        uint256 _price,
        uint256 _rating,
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _imgUrl
    ) public {
        require(checkUserExists(msg.sender) == true, "Accounts need to be created");
        require(storeExist == true, "you need to own a store to list products");
        require(bytes(_name).length>0, "Username cannot be empty");
        require(bytes(_description).length>0, "Username cannot be empty");
        require(bytes(_imgUrl).length>0, "Username cannot be empty");
        require(msg.sender == _seller , "you need to be a seller");
        require(bytes(_category).length>0, "Username cannot be empty");
        Product memory newProduct = Product({
            buyer: address(0),
            seller: msg.sender,
            id: productCounter,
            price: _price,
            rating: _rating,
            name: _name,
            description: _description,
            category: _category,
            imgUrl: _imgUrl
        });

        product[productCounter] = newProduct;
        productCounter++;
        products.push(newProduct);
    }

   //payable for the products in a store
  function payForProducts(
        uint _id
    ) public payable {
        Product storage productsid = product[_id];
        require(msg.value == productsid.price, "Invalid amount sent for productid");
        require(productsid.seller != address(0));
        require(productsid.buyer == address(0), "Item has been bought");
        require(
            msg.sender != productsid.seller,
            "Seller cannot buy their own productid"
        );
        productsid.buyer = msg.sender;
        payable(productsid.seller).transfer(msg.value);
    } 

    //get every store in the store
    function getAllStore() public view returns (Store[] memory) {
        return store;
    }

    //get every single products in the store
    function getAllProduct() public view returns (Product[] memory) {
        return products;
    }

    //get number of products in the contract
    function getNumberOfProducts() public view returns (uint256) {
        return productCounter;
     }
    
    //get number of store in the contract
    function getNumberOfStore() public view returns (uint256) {
        return storeCounter;
     }

    //function to get all the product of a particular user
     function fetchSellerProducts(address _seller) external view returns(Product[] memory) {
       Product[] memory sellerProducts = new Product[](productCounter);
       for(uint i = 0; i<productCounter; i++) {
          if(product[i].seller == _seller) {
              sellerProducts[i] = product[i];
          }
       }
       return sellerProducts;
    }
    
    //this fetch a user products by its address
    function fetchSellerStore(address _creator) external view returns(Store[] memory) {
       Store[] memory sellerStore = new Store[](storeCounter);
       for(uint i = 0; i<storeCounter; i++) {
          if(store[i].creator == _creator) {
              sellerStore[i] = store[i];
          }
       }
       return sellerStore;
    }

   //fetch a users products and store details
   function getAllUserStoreAndProducts(address _pubkey) external view returns(Product[] memory, Store[] memory) {
        Product[] memory sellerProducts = new Product[](productCounter);
        for(uint i = 0; i<productCounter; i++) {
            if(product[i].seller == _pubkey) {
                sellerProducts[i] = product[i];
            }
        }
        Store[] memory sellerStore = new Store[](storeCounter);
        for(uint i = 0; i<storeCounter; i++) {
            if(store[i].creator == _pubkey) {
                sellerStore[i] = store[i];
            }
        }
        return(sellerProducts, sellerStore);
    }
}
