import { For, type Component, createSignal, Signal, Suspense, Setter, lazy, createResource, createContext, useContext, Accessor } from 'solid-js';

import { FoodProps, MacroNutrientsProps, MealItemProps, MealProps, StoreSig } from '../types';
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
    let res = await API.get<{ meals: MealProps[] }>('http://localhost:4000/day/20230521');
    let data = res.data;

    let meals = data.meals;
    meals = meals.map((meal: MealProps) => {
      meal.items = [
        {
          food: () => foods()?.[0],
          quantity: 100,
        } as MealItemProps,
        {
          food: () => foods()?.[1],
          quantity: 200,
        } as MealItemProps,
      ]
      return meal;
    });

    console.log(`Meal count: `, meals.length);
    return meals as MealProps[];
  });

  return { foods, meals };
}

const ModalShowContext = createContext<Signal<boolean>>();

function ModalShowProvider(props: { children: any }) {
  const [show, setShow] = createSignal(false);

  return (
    <ModalShowContext.Provider value={[show, setShow]}>
      {props.children}
    </ModalShowContext.Provider>
  )
}

function useModalShow() {
  const context = useContext(ModalShowContext);
  if (!context) {
    throw new Error('useModalShow must be used within a ModalShowProvider')
  }
  return context;
}

const Home: Component = () => {
  return (
    <ModalShowProvider>
      <HomeInner />
    </ModalShowProvider>
  )
}

const HomeInner: Component = () => {
  const { foods, meals } = useRouteData<typeof routeData>();

  const macros = () => {
    return sumMacros(meals()?.map?.((meal) =>
      sumMacros(
        meal.items.map((item) =>
          multiplyMacros(item.food()?.macros ?? emptyMacros(), item.quantity)
        )
      )
    ) ?? [])
  }

  const [show, setShow] = useModalShow();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  setInterval(() => {
    setShow(!show());
  }, 1000);

  return (
    <div>
      <div class="row g-0 bg-black always-full-page">

        <Modal
          title="Adicionar item"
          centered={false}
          show={show()}
          contentClass='bg-dark border p-3'
          onHide={handleClose}
          keyboard={true}
        >
          <Modal.Header closeButton closeVariant='white'>
            <Modal.Title>Adicionar item na refeição</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Nome do alimento
            <Suspense fallback={<p>Loading...</p>}>
              {/* <MealItemAdd
                {...meals()?.[0].items[0] ?? {} as MealItemProps} //TODO: fix this
              // {...meals[0]()[0].items[0][0]}
              /> */}
            </Suspense>
          </Modal.Body>
        </Modal>
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


//TODO: remove export
export const MealItemAdd: Component<MealItemProps> = () => {
  const { foods, meals } = useRouteData<typeof routeData>();
  const [show, setShow] = useModalShow();

  const [selectedFood, setSelectedFood] = createSignal<FoodProps | undefined>(undefined);
  const [quantity, setQuantity] = createSignal(0);

  const foodMacros = () => selectedFood()?.macros;
  const macros = () => multiplyMacros(foodMacros() || emptyMacros(), quantity());

  const canAdd = () => selectedFood() !== undefined && quantity() > 0;

  const options = createOptions(foods() ?? ['Loading...'], { key: 'name' });

  const handleFilter = (selectedFood: FoodProps) => {
    //TODO: optimize

    setSelectedFood(selectedFood);

  }

  return (
    <>
      <div class="row mb-2 g-0">
        <div class="col">
          <Select placeholder='Alimento' class='custom' {...options} onChange={handleFilter} />
        </div>
      </div>
      <div class="row mb-2 g-0">
        <div class="col">
          <input type="text" class="form-control custom" placeholder="Quantidade (gramas)" onInput={(e) => setQuantity(parseInt(e.target.value))} maxLength={5} />
        </div>
      </div>
      <div class="row mb-2 g-0 mt-5">
        <h1>Pré-visualização:</h1>
        {
          (selectedFood() === undefined) ?
            <>
              <div class="col g-0">
                <span class="text-warning fs-5">
                  Nenhum alimento selecionado!
                </span>
              </div>
            </> :
            <>
              <div class="col g-0">
                <div class="row g-0 bg-dark-grey">
                  <div class="col ps-2">
                    <span class="fs-4">{selectedFood()?.name}</span>
                  </div>
                  <div class="row bg-dark-grey g-0">
                    <div class="col">
                      <span class="ps-1">
                        <MacroNutrients {...macros()} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1 g-0 bg-dark-grey d-flex justify-content-end">
                <span class="align-self-end p-1 pe-3">
                  {quantity()}g
                </span>
              </div>
            </>
        }
      </div>
      <div class="row mb-2 g-4 mt-5">
        <div class="col">
          <button class="btn btn-secondary w-100 bg p-1" onClick={() => {
            setShow(false);
          }}>
            Cancelar
          </button>
        </div>
        <div class="col">
          <button disabled={!canAdd()} class={`btn ${canAdd() ? 'btn-primary' : 'btn-dark text-muted'} w-100 bg p-1`} onClick={() => {
            setShow(false);
            // props.items[1]([...props.items[0], props.items[0][0]]);
            const firstMeal = meals()?.[0];

            if (firstMeal === undefined) {
              console.error('firstMeal is undefined');
              throw new Error('firstMeal is undefined');
            }

            const firstMealItemsSetter = firstMeal.items[1];
            const firstMealItems = firstMeal.items[0];

            const selectedFoodVal = selectedFood();
            if (selectedFoodVal === undefined) {
              console.error('selectedFood is undefined');
              throw new Error('selectedFood is undefined');
            }

            const newMealItem: MealItemProps = {
              food: () => selectedFoodVal,
              quantity: quantity(),
            };

            // firstMealItemsSetter([...firstMealItems, newMealItem]);
            console.log(JSON.stringify(firstMealItems, null, 2));
            //dump to json

            window.scrollBy(0, 67)
          }}>
            Adicionar
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
