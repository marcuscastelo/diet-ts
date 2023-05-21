// import { Component, For, Suspense, createResource } from "solid-js";
// import { aaaFoods, test } from "./db";
// import { useRouteData } from "solid-start";

// const Foods: Component = () => {
//     const { foods: foodList } = aaaFoods();
//     return (
//         <>
//             <h1>Foods</h1>

//             <Suspense fallback={<div>Loading...</div>}>
//                 <For each={foodList()}>
//                     {(food) => (
//                         <div>
//                             <h2>{food.name}</h2>
//                             <p>{food.macros.carbo}</p>
//                             <p>{food.macros.protein}</p>
//                             <p>{food.macros.fat}</p>
//                         </div>
//                     )}
//                 </For>
//             </Suspense>

//         </>
//     );
// };

// export default Foods;