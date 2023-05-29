import { For, type Component, createSignal, Signal, Setter, lazy, createResource, createContext, useContext, Accessor, Show, Resource, Suspense } from 'solid-js';

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
import server$, { createServerAction$, createServerData$ } from 'solid-start/server';
import MacroNutrients from '~/components/MacroNutrients';
import { emptyMacros, multiplyMacros, sumMacros } from '~/utils/macros';
import { MealData } from '~/model/mealModel';
import { MealItemAddData, MealItemData } from '~/model/mealItemModel';
import Meal from '~/components/Meal';
import MealItemAddModal from '~/components/MealItemAddModal';
import { FoodData } from '~/model/foodModel';
import { ifError } from 'assert';

export function routeData({ params }: RouteDataArgs) {
  const foods = createServerData$(async () => {
    const mockMacros = (item: FoodData) => {
      item.macros = {
        protein: 123,
        carbs: 123,
        fat: 12,
      };
      return item;
    };

    return (await API.get<FoodData[]>('http://localhost:4000/food/search?q=frango')).data?.map(mockMacros);
  });

  const meals = createServerData$(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return (await API.get<{ meals: MealData[] }>('http://localhost:4000/day/20230521?create=true'))
      .data
      .meals;
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
  const [showModal, setShowModal] = createSignal(false);
  const { foods, meals } = useRouteData<typeof routeData>();

  const macros = () => {
    return sumMacros(meals()?.map?.((meal) =>
      sumMacros(
        meal.items?.map((item) =>
          multiplyMacros(item.food.macros ?? emptyMacros(), item.quantity)
        ) ?? []
      )
    ) ?? [])
  }

  const [itemAddition, addItem] = createServerAction$(async (item: MealItemAddData) => {
    dayController.createDay
  });

  const onAddItemRequest = async () => {
    setShowModal(true);
  }

  const onItemAdded = (item: MealItemAddData) => {
    addItem(item);
    alert('item added:\n' + JSON.stringify(item, null, 2));
  }

  const onItemCanceled = () => {
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

          <Show when={itemAddition.pending}>
            <p>Adding item...</p>
          </Show>

          <Suspense fallback={<p>Loading foods...</p>}>
            <MealItemAddModal
              show={showModal}
              setShow={setShowModal}
              foods={foods as Resource<FoodProps[]>}
              onAdd={onItemAdded}
              onCancel={onItemCanceled}
            />
          </Suspense>

          <Suspense fallback={<p>Loading meals...</p>}>
            <Show when={meals()?.length ?? 0 > 0}>
              <Meal onAddItem={onAddItemRequest} mealData={(meals() as MealData[])[0]} />
              <Meal onAddItem={onAddItemRequest} mealData={(meals() as MealData[])[1]} />
              <Meal onAddItem={onAddItemRequest} mealData={(meals() as MealData[])[2]} />
              <Meal onAddItem={onAddItemRequest} mealData={(meals() as MealData[])[3]} />
            </Show>
          </Suspense>

          {
            <p>{JSON.stringify(meals())}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
