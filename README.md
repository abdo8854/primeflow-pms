

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2.  Run the app:
   `npm run dev`

graph TD
    A[Product Dashboard]
    A --> B[Authentication]
    B --> B1[Login]
    B --> B2[Register]
    B --> B3[Reset Password]

    A --> C[Dashboard Overview]
    C --> C1[Total Products]
    C --> C2[Total Orders]
    C --> C3[Total Users]
    C --> C4[Sales Analytics]
    C --> C5[Low Stock]

    A --> D[Product Management]
    D --> D1[View Products]
    D --> D2[Add Product]
    D --> D3[Edit Product]
    D --> D4[Delete Product]

    A --> E[Category Management]
    E --> E1[Add Category]
    E --> E2[Edit Category]
    E --> E3[Delete Category]

    A --> F[User Management]
    F --> F1[Add User]
    F --> F2[Assign Roles]
    F --> F3[Update User Info]
    F --> F4[Enable/Disable]

    A --> G[Settings]
    G --> G1[Light/Dark]
    G --> G2[Update Profile]
