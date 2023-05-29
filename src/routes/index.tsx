import { For, type Component, createSignal, Signal, Setter, lazy, createResource, createContext, useContext, Accessor, Show, Resource, Suspense } from 'solid-js';

import { FoodProps, StoreSig } from '../types';
import { Modal, ProgressBar } from 'solid-bootstrap';
import CircleProgressBar from '../components/CircleProgressBar';
import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css'
import { A, ErrorBoundary, RouteDataArgs, useRouteData } from 'solid-start';
import * as dayController from '../controllers/dayController';
import * as foodController from '../controllers/foodController';
import server$, { createServerAction$, createServerData$ } from 'solid-start/server';
import MacroNutrients from '~/components/MacroNutrients';
import { emptyMacros, multiplyMacros, sumMacros } from '~/utils/macros';
import { MealData } from '~/model/mealModel';
import { MealItemAddData, MealItemData } from '~/model/mealItemModel';
import Meal from '~/components/Meal';
import MealItemAddModal from '~/components/MealItemAddModal';
import { FoodData } from '~/model/foodModel';
import { dayId } from '~/utils/date';
import { isServer } from 'solid-js/web';
import MealItemEditBody from '~/components/MealItemEditBody';
import MealItemEditModal from '~/components/MealItemEditModal';

const todayId = dayId(new Date());

export function routeData({ params }: RouteDataArgs) {
  const foods = createServerData$(async () => {
    const mockMacros = (food: Omit<FoodData, 'macros'>) => ({
      ...food,
      macros: {
        protein: 123,
        carbs: 123,
        fat: 12,
      },
    } as FoodData);
    return (await foodController.listFoods()).map(mockMacros);
  });

  const meals = createServerData$(async () => (await dayController.getDay(todayId, true)).meals);

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
  const [showAddModal, setShowAddModal] = createSignal(false);
  const [showEditModal, setShowEditModal] = createSignal(false);
  const [targetEditItem, setTargetEditItem] = createSignal<MealItemData | null>(null);

  const [requestedMealId, setRequestedMealId] = createSignal<string | null>(null);
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

  // Add action
  const [itemAddition, addItem] = createServerAction$(async ({ item, mealId }: { item: MealItemAddData, mealId: string }) => {
    const today = await dayController.getDay(todayId, false);
    const meal = today.meals.find((meal) => meal.id === mealId);
    if (!meal) {
      throw new Error(`Meal ${mealId} not found in today's meals (todayId: ${todayId})`);
    }

    const mealItem: MealItemData = {
      id: '123',
      food: item.food,
      quantity: item.quantity,
      mealId: meal.id,
    };

    meal.items.push(mealItem);

    await dayController.updateDay(today);
  });

  // Add request
  const onAddItemRequest = async (mealId: string) => {
    setShowAddModal(true);
    setRequestedMealId(mealId);
  }

  // Add request cancel
  const onAddCanceled = () => {
    setRequestedMealId(null);
  }

  // Add request confirm
  const onAddConfirmed = (item: MealItemAddData) => {
    if (!requestedMealId()) {
      throw new Error('Bug: requestedMealId is null');
    }

    addItem({
      item,
      mealId: requestedMealId()!,
    });

    setRequestedMealId(null);
  }

  // Edit action
  const [itemEdition, editItem] = createServerAction$(async ({ item }: { item: MealItemData }) => {
    const today = await dayController.getDay(todayId, false);
    const meal = today.meals.find((meal) => meal.id === item.mealId);
    if (!meal) {
      throw new Error(`Meal ${item.mealId} not found in today's meals (todayId: ${todayId})`);
    }

    const mealItem = meal.items.find((mealItem) => mealItem.id === item.id);

    if (!mealItem) {
      throw new Error(`Meal item ${item.id} not found in today's meals (todayId: ${todayId})`);
    }

    mealItem.food = item.food;
    mealItem.quantity = item.quantity;

    await dayController.updateDay(today);
  });

  // Edit request
  const onEditItemRequest = async (item: MealItemData) => {
    setTargetEditItem(item);
    setShowEditModal(true);
  };

  // Edit request cancel
  const onEditCanceled = () => {
    setShowEditModal(false);
  };

  // Edit request confirm
  const onEditConfirmed = (item: MealItemData) => {
    alert('edit confirmed \n' + JSON.stringify(item, null, 2));
    editItem({ item });
  };    

  // Delete action
  const [itemDeletion, deleteItem] = createServerAction$(async ({ item }: { item: MealItemData }) => {
    const today = await dayController.getDay(todayId, false);
    const meal = today.meals.find((meal) => meal.id === item.mealId);
    if (!meal) {
      throw new Error(`Meal ${item.mealId} not found in today's meals (todayId: ${todayId})`);
    }

    const mealItemIndex = meal.items.findIndex((mealItem) => mealItem.id === item.id);
    
    if (mealItemIndex === -1) {
      throw new Error(`Meal item ${item.id} not found in today's meals (todayId: ${todayId})`);
    }

    meal.items.splice(mealItemIndex, 1);

    await dayController.updateDay(today);
  });

  // Delete request
  const onDeleteItemRequest = async (item: MealItemData) => {
    deleteItem({ item });
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
          {isServer ? <div> Server </div> : <div> Client </div>}
          <Show when={itemAddition.pending}>
            <p>Adding item...</p>
          </Show>
          <Show when={itemEdition.pending}>
            <p>Editing item...</p>
          </Show>
          <Show when={itemDeletion.pending}>
            <p>Deleting item...</p>
          </Show>

          <Suspense fallback={<p>Loading foods...</p>}>
            <MealItemAddModal
              show={showAddModal}
              setShow={setShowAddModal}
              foods={foods as Resource<FoodProps[]>}
              onSave={onAddConfirmed}
              onCancel={onAddCanceled}
            />

            <Show when={targetEditItem() !== null}>
              <MealItemEditModal
                show={showEditModal}
                setShow={setShowEditModal}
                mealItem={targetEditItem()!}
                foods={foods as Resource<FoodProps[]>}
                onSave={onEditConfirmed}
                onCancel={onEditCanceled}
              />
            </Show>
          </Suspense>

          <Suspense fallback={<p>Loading meals...</p>}>
            <Show when={meals()?.length ?? 0 > 0}>
              <Meal
                mealData={(meals() as MealData[])[0]}
                onAddItem={() => onAddItemRequest((meals() as MealData[])[0].id)}
                onEditItem={(item) => onEditItemRequest(item)}
                onDeleteItem={(item) => onDeleteItemRequest(item)}
              />
              <Meal
                mealData={(meals() as MealData[])[1]}
                onAddItem={() => onAddItemRequest((meals() as MealData[])[1].id)}
                onEditItem={(item) => onEditItemRequest(item)}
                onDeleteItem={(item) => onDeleteItemRequest(item)}
              />
              <Meal
                mealData={(meals() as MealData[])[2]}
                onAddItem={() => onAddItemRequest((meals() as MealData[])[2].id)}
                onEditItem={(item) => onEditItemRequest(item)}
                onDeleteItem={(item) => onDeleteItemRequest(item)}
              />
              <Meal
                mealData={(meals() as MealData[])[3]}
                onAddItem={() => onAddItemRequest((meals() as MealData[])[2].id)}
                onEditItem={(item) => onEditItemRequest(item)}
                onDeleteItem={(item) => onDeleteItemRequest(item)}
              />
            </Show>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
