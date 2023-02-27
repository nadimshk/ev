# JS-Mini-Store-Pagination

## Submission Instructions [Please note]

## Maximum Marks - 20

- The Submission should not contain spaces, for example /js-101 folder/eval will not work
- Do not push node_modules and package_lock.json to github

```
 ✅ able to submit the app - 1 mark ( minimum score )
 ✅ Navbar Should be exported from navbar.js - 1 mark
 ✅ should be able to make the fetch request on page loads - 2 mark
 ✅ On home Page by default page 1 data should be appended - 1 marks
 ✅ On first page Previous button should be disabled - 1 mark
 ✅ On moving page previous or next the page number on DOM should update - 1 mark
 ✅ On clicking next button, data from that particular page should fetched and shown -2 marks
 ✅ On last page next button should be disabled - 1 mark
 ✅ Clicking sort high to low should sort data high to low for current page only - 2 marks
 ✅ Clicking sort low to high should sort data low to high for current page only - 2 marks
 ✅ On adding items to the cart and the cart count in the navbar should be updated - 1 marks
 ✅ Shound not able to add same product twice in cart and alert should be shown - 1 mark
 ✅ The cart items should be added to LocalStorage - 1 mark
 ✅ Items added to cart is reflected on cart page - 2 marks
 ✅ On removing an item that item should be removed - 1 mark
```

## Installation

- you can use any node version that works for you ( 14+ )
- please make sure you do not push package-lock.json
- Download and unzip the boilerplate
- Navigate to the correct path
- Run **npm install** to install the node modules

## Folder structure

- index.html
- cart.html
- src
  - scripts
    - index.js
    - cart.js
    - navbar.js
- styles
  - index.css
  - cart.css
- README.md
- package.json
- cypress (ignore the files under cypress)

### You haven't taught cypress to run the test cases locally , you can see the passed/ failed test cases and test errors on CP itself.

## Description

#### Problem

- Create a Mini Store where users can see pagination on items, sort the items, add the item to their cart and remove from cart.

#### API :-

✅ URL :- `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-tech-products`
✅ Query Params :-
`limit=(Number of items per page)`
`page=(Page number)`
`sort=(value)` sort by price
`order=(asc | desc)`

#### Description

- On page loads make a fetch request to the above given API.
- the default page is `1` and the limit is `6` per page
- On index.html(Home Page), the user will be able to see a list of items with `add to cart` option and you can't able to add items twice show alert "Item already exists"
- Maximum `6` items will be shown per page (**Implement Pagination**).
- There will be two buttons previous and next, to navigate between pages.
- The `previous` button should be disabled on page 1 and the next button should be disabled on the last page.
- on clicking the previous button decrement the current page by 1 and make a fetch request with the new page number and get the details.
- on clicking the next button increment the current page by 1 and make a fetch request and get the details.
- Show the current page number on top between the two buttons(**Only Page number no extra text**)

- Give two buttons to sort the items
- `sorting` should be done using `api` only
- On sorting, pass current page to `params` to sort.

- Navbar will have a link to the home page and cart page.
- It will also show the number of items added to the cart.
- the cart count is 0 by default.
- Both the home page and cart page will have the same navbar with the same functionality(**Use Import Export**)
- Store the items added to the cart in the `local-storage` with the key as **cart**.
- The cart page will show the items added to the cart, with an option to remove them.
- On removing any item the item should be removed from local storage as well and the total count of cart items in the navbar should also update.

#### Things to follow :-

1.  Navbar
    (**Create a function `navbar` which will return navbar elements and export from navbar.js**)

- The cart link should have `id = "cart"`
- The home or index page link should have `id = home`
- Cart count should have a div with `id = cart_count`

2.  Home page (index.html)

- The previous button should have an `id ="previous"`
- Next button should have an `id ="next"`
- The page number tag have an `id ="page_number"`
- Sort Low to High button have `id ="sort-lth"`
- Sort High to Low button have `id ="sort-htl"`

- All the items will be appended inside a parent `div` with an `id ="main_items"`
- Each item should be displayed as cards and the should have a `class ="item"`
- The price tag in every card should have `class ="price"`
- Add to cart button should have a `class = "add_to_cart"`

<img width="1719" alt="Screenshot 2022-11-25 at 12 05 27 PM" src="https://user-images.githubusercontent.com/103956933/220563060-370b244d-9837-426f-b108-16c7061560dc.png">

3.  Cart Page (cart.html)

- All the cart items will be appended inside `div` with `id = "items"`
- Item card will have `class = "item"`
- Remove button will have `class ="remove"`

<img width="1721" alt="Screenshot 2022-11-25 at 12 05 53 PM" src="https://user-images.githubusercontent.com/103956933/220563047-bde3522b-5dae-4ebb-841b-3e7c4c747d76.png">

- use the styles folder to style for index and cart pages

## Note:-

#### Strictly follow the template. Cross-check HTML Id's and classes.

#### Focus more on the functionality of your app. Avoid spending more time styling. You can do that once you finish the end-to-end flow of app. All the best!

**Note:- Do not use any other names for the methods other than those mentioned.**

####

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not to just submit it last minute
- try to keep one submission at a time
