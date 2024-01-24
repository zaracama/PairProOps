>>>>>>>>>> PairProOps  <<<<<<<<<<<<
User memiliki banyak PreOrder (One-to-Many).
Game memiliki banyak PreOrder (One-to-Many).
PreOrder memiliki satu User dan satu Game (Many-to-One).

##
kita akan mendemonstrasikan 3 tabel

id (Primary Key)
username (Optional)
email (Unique, Not Null, Email Format)
password (Not Null, Minimum Length: 8)
role
Game:

id (Primary Key)
title (Not Null)
description (Not Null)
releaseDate (Not Null)
price (Not Null, Minimum Price: Bebas)
imgUrl (Not Null)
developer (Not Null)
publisher (Not Null)
createdAt
updatedAt
PreOrder:

id (Primary Key)
userId (Foreign Key referencing User)
gameId (Foreign Key referencing Game)
orderDate (Not Null)
totalAmount (Not Null, Minimum Amount: Bebas)
status (Not Null, Contoh: "Pending", "Completed")
createdAt
updatedAt
