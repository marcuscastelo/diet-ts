import { For, type Component, createSignal, Signal, Suspense, Setter, lazy, createResource, createContext, useContext, Accessor } from 'solid-js';

import { FoodProps, StoreSig } from '../types';
import { Modal, ProgressBar } from 'solid-bootstrap';
import CircleProgressBar from '../components/CircleProgressBar';
import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css'
import { A, ErrorBoundary, RouteDataArgs, useRouteData } from 'solid-start';
import { API } from './db';
import * as dayController from '../controllers/dayController';
import * as foodController from '../controllers/foodController';
import { initDB } from '~/utils/surreal_db';
import server$, { createServerData$ } from 'solid-start/server';
import MacroNutrients from '~/components/MacroNutrients';
import { emptyMacros, multiplyMacros, sumMacros } from '~/utils/macros';
import { MealData } from '~/model/mealModel';
import { MealItemData } from '~/model/mealItemModel';

export function routeData({ params }: RouteDataArgs) {
  const foods = createServerData$(async () => {
    let res = await API.get<FoodProps[]>('http://localhost:4000/food/search?q=frango');

    let data = res.data;
    data = data.map((item: FoodProps) => {
      item.macros = {
        protein: 123,
        carbs: 123,
        fat: 12,
      };
      return item;
    });

    console.log(`Food count: `, data.length);
    return data;
  });

  const [meals] = createResource(async () => {
    let res = await API.get<{ meals: MealData[] }>('http://localhost:4000/day/20230521');
    let data = res.data;

    let meals = data.meals;

    console.log(`Meal count: `, meals.length);
    return meals as MealData[];
  });

  return { foods, meals };
}

const Home: Component = () => {
  return (
      <HomeInner />
    // <ModalShowProvider>
    // </ModalShowProvider>
  )
}

const HomeInner: Component = () => {
  const { foods, meals } = useRouteData<typeof routeData>();

  const macros = () => {
    return sumMacros(meals()?.map?.((meal) =>
      sumMacros(
        meal.items.map((item) =>
          multiplyMacros(item.foodMacros ?? emptyMacros(), item.quantity)
        )
      )
    ) ?? [])
  }

  return (
    <div>
      <div class="row g-0 bg-black always-full-page">
        <div class="col-12 col-md-9 mx-auto">
          <div class="row g-0 bg-black">
            <div class="col-6 col-md-4 mx-auto">
              <div class="row g-0 d-flex my-3 text-center">
                <CircleProgressBar class="mx-auto" variant='success' label="100g" animated={true} min={0} max={2000} now={100} />
              </div>
            </div>
            <div class="col mx-auto">
              <div class="row g-0 my-3 text-center">
                <span class="text-start fs-5">Carboidrato</span>
                <ProgressBar variant='success' label={`${macros().carbs}g`} animated={true} min={0} max={200} now={macros().carbs} />
              </div>
              <div class="row g-0 my-3 text-center">
                <span class="text-start fs-5">Proteína</span>
                <ProgressBar variant='danger' label={`${macros().protein}g`} animated={true} min={0} max={200} now={macros().protein} />
              </div>
              <div class="row g-0 my-3 text-center">
                <span class="text-start fs-5">Gordura</span>
                <ProgressBar variant='warning' label={`${macros().fat}g`} animated={true} min={0} max={200} now={macros().fat} />
              </div>
              <div class="row g-0 my-3 text-center">
                <span class="fs-2"><MacroNutrients {...macros()} /></span>
              </div>
            </div>
          </div>
          <div class="row g-0 my-3 text-center">
          </div>

          {
            <p>{JSON.stringify(meals())}</p>
            // <Meal name='1' items={[]} />
          }

          {/* <For
            each={[{name: '1'}]}
            fallback={
              <>
                <h1 class="text-center text-danger my-5">Nenhuma refeição cadastrada!</h1>
              </>
            }
          >
            {(meal) => <Meal name={meal.name + Date.now()} items={[]} />}
          </For> */}

          {/* <For
            each={meals() ?? []}
            fallback={
              <>
                <h1 class="text-center text-danger my-5">Nenhuma refeição cadastrada!</h1>
              </>
            }
          >
            {(meal) => <Meal {...meal} />}
          </For> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
