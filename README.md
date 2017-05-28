## Inspiration
We love using our social media. We love text to our friends. Imagine having a friend who you can send your Math problem and get the answer in seconds? It would be amazing. All of this without leaving social media and without installing any other application.

## What it does
This amazing app helps you to either quick calculate math problems or confirm if your answer is correct. You just need to start a conversation with a messenger bot, and it will help you giving you a list of commands you can use.

## How I built it
I building this application in Javascript using Express.js. To solve Math problems, this application uses mathjs library which makes everything work smooth.

## Challenges I ran into
Trying to differentiate each case where the user wants to do a specific thing. Of course, the limit is the sky, or the galaxy... Also, it was not easy to set up the OCR to recognize text images and calculate the answer right away.

## Accomplishments that I'm proud of
I am proud of developing my first Facebook Messenger bot. I never thought that this application can help a lot of person who are struggling in Math and can simplify the way to check an answer.

## What I learned
I have learned how to configure a Facebook Messenger bot by doing this app and how to use mathjs library. I also learned that the limit of programming is yourself. If you think you can't do something, is because you have not tried hard.

##Beta Testers?
Facebook has approved the bot :) Go straight and test the bot ;)

##Commands

Here is a list of examples of available commands for this bot:

**To graph a function:**
graph: x^2

**To simplify a fraction or equation:**
simplify: 10/4

**To solve complex numbers:**
complex: 2i + 5i - 4 + 12

**To derivate an equation:**
derivate: x^2 + 5x + 2

**To get LCM between two numbers (_BETA, does not work with more than 2 numbers_):**
lcm: 4,6

**To get GCD between two numbers (_BETA, does not work with more than 2 numbers_):**
gcd: 4,6

**To get Extended Euclidean Algorithm between two numbers:**
xgcd: 4,6

**To convert from an unit to another unit:**
convert: 5 m to km

**To solve an equation for X:**
solve: x-1 = 0

**To calculate an indefinite integral:**
integrate: x^2

**BETA: Solve using images:**
Write in a document the following examples and snap them without any other text:

Graph: x^2
Solve: x + 2 = 0
Simplify 10/4

**Take in mind that sometimes it will not work because it is still on beta phase.**

**To get all this command on the chat, just write help**

To do a simple Math operation, you don't need any command, just tell it right away. For example: 5+5*6

## What's next for Math on the fly
Solve more operations using image recognition! Stay tuned!

Rename the project to something more general. I want to cover more topics such as Chemistry, Biology, Math, Physics, etc...
