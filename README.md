# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview
This challenge was created with `create-next-app` Using Typescript and Tailwind. I Decided to give Tailwind another go. At first I didn't like the way it adds so much more to the components and pages but it really is super fast to get a project that doesn't require to much styling finished.  

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Screenshot

![](./where-in-the-world/public/Screenshot-main-mobile-light.png)
![](./where-in-the-world/public/Screenshot-main-mobile-dark.png)
![](./where-in-the-world/public/Screenshot-main-desktop-light.png)
![](./where-in-the-world/public/Screenshot-main-desktop-dark.png)
![](./where-in-the-world/public/Screenshot-detail-mobile-light.png)
![](./where-in-the-world/public/Screenshot-detail-mobile-dark.png)
![](./where-in-the-world/public/Screenshot-detail-desktop-light.png)
![](./where-in-the-world/public/Screenshot-detail-desktop-dark.png)


### Links

- Solution URL: [https://github.com/timbosTours/Frontend-Mentor-where-in-the-world](https://github.com/timbosTours/Frontend-Mentor-where-in-the-world)
- Live Site URL: [https://frontend-mentor-where-in-the-world-tf.vercel.app/](https://frontend-mentor-where-in-the-world-tf.vercel.app/)

## My process

Got started with `create-next-app`. Worked on the pages and layout first, then onto the functionality. Once I was happy that everything was working properly I installed Tailwind and went for a mobile first approach. Finishing off with Dark mode followed by accessibility and final checks.

### Built with

- Semantic HTML5 markup
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Typescript](https://www.typescriptlang.org/) - Type safety
- [Tailwind](https://tailwindcss.com/) - For styles
- [next-themes](https://www.npmjs.com/package/next-themes?activeTab=readme) - For dark mode toggle


### What I learned

I learned how to make a dark theme with Tailwind and next-themes.

I also learned how to navigate back through the previous pages with next/navigation;

```<button
        onClick={() => {
        router.back();
        }}
        className="py-1.5 px-6 pl-2 my-4 mb-12 bg-white text-gray-900 rounded shadow-3xl flex text-sm font-thin dark:bg-gray-800 dark:text-white"
    >```



### Useful resources

- (https://www.youtube.com/watch?v=optD7ns4ISQ) - This video helped me get the dark mode toggle working.


## Author

- Website - [Timothy Fawcett](https://github.com/timbosTours)
- Frontend Mentor - [@timbosTours](https://www.frontendmentor.io/profile/timbosTours)
- Twitter - [@timbosTours](https://www.twitter.com/timbosTours)


## Acknowledgments

Thanks for the awesome challenge Frontend Mentor. Had a lot of fun on this one.
