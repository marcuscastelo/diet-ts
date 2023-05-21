import { For, type Component, createSignal, Signal, Suspense, Setter, lazy, createResource } from 'solid-js';

import Fa from 'solid-fa'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { createStore } from 'solid-js/store';
import { FoodProps, MacroNutrientsProps, MealItemProps, MealProps, StoreSig } from '../types';
import { Modal, ProgressBar } from 'solid-bootstrap';
import CircleProgressBar from '../components/CircleProgressBar';
import { Select, createOptions } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css'
import { A, ErrorBoundary, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { API } from './db';

function emptyMacros(): MacroNutrientsProps {
  return {
    carbo: 0,
    protein: 0,
    fat: 0,
  }
}

function multiplyMacros(macros: MacroNutrientsProps, quantity: number): MacroNutrientsProps {
  const multiplier = quantity / 100;
  return {
    carbo: macros.carbo * multiplier,
    protein: macros.protein * multiplier,
    fat: macros.fat * multiplier,
  }
}

function sumMacros([...macros]: MacroNutrientsProps[]): MacroNutrientsProps {
  return macros.reduce((acc, curr) => {
    return {
      carbo: acc.carbo + curr.carbo,
      protein: acc.protein + curr.protein,
      fat: acc.fat + curr.fat,
    }
  }, {
    carbo: 0,
    protein: 0,
    fat: 0,
  })
}

function macroCalories(macros: MacroNutrientsProps): number {
  return macros.carbo * 4 + macros.protein * 4 + macros.fat * 9;
}

export function routeData() {
  const [foods] = createResource(async () => {
    let res = await API.get<FoodProps[]>('http://localhost:4000/food/search?q=frango');

    let data = res.data;
    data = data.map((item: FoodProps) => {
      item.macros = {
        protein: 123,
        carbo: 123,
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

  const testeFoods = foods();
  const testeMeals = meals();

  const [show, setShow] = createSignal(false);

  return { foods, meals, show, setShow };
}

const Home: Component = () => {
  const { foods, meals, show, setShow } = useRouteData<typeof routeData>();

  const macros = () => {
    return sumMacros(meals()?.map?.((meal) =>
      sumMacros(
        meal.items.map((item) =>
          multiplyMacros(item.food()?.macros ?? emptyMacros(), item.quantity)
        )
      )
    ) ?? [])
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div class="row g-0 bg-black always-full-page">

        <Modal
          title="Adicionar item"
          centered={true}
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
                <ProgressBar variant='success' label={`${macros().carbo}g`} animated={true} min={0} max={200} now={macros().carbo} />
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

          <For
            each={meals() ?? []}
            fallback={
              <>
                <h1 class="text-center text-danger my-5">Nenhuma refeição cadastrada!</h1>
              </>
            }
          >
            {(meal) => <Meal {...meal} />}
          </For>
        </div>
      </div>
    </div>
  );
};

const MacroNutrients: Component<MacroNutrientsProps> = (props: MacroNutrientsProps) => {
  return (
    <>
      <span class="text-success"> C: {Math.round(props.carbo)} </span>
      <span class="text-danger"> P: {Math.round(props.protein)} </span>
      <span class="text-warning"> G: {Math.round(props.fat)} </span>
    </>
  );
}

const Meal: Component<MealProps> = (props: MealProps) => {
  const { show, setShow } = useRouteData<typeof routeData>();

  const macros = () => sumMacros(
    props.items.map((item) =>
      multiplyMacros(item.food()?.macros ?? emptyMacros(), item.quantity)
    )
  );

  return (
    <div class="row g-0 bg bg-dark rounded p-3 pt-2 mb-2">
      <div class="col">
        <div class="row g-0">
          <span class="fs-1 text-light-emphasis">{props.name}</span>
        </div>
        <div class="row g-0 mb-3">
          <span class=""><MacroNutrients {...macros()} /></span>
        </div>
        <For each={props.items}>
          {
            (item) =>
              <MealItem {...item} />
          }
        </For>

        <button class="btn btn-primary w-100 bg p-1" onClick={() => {
          setShow(true);
        }}>
          Adicionar
        </button>
      </div>
    </div >
  );
}

const MealItem: Component<MealItemProps> = (props: MealItemProps) => {
  const foodMacros = () => props.food()?.macros ?? emptyMacros();
  const macros = () => multiplyMacros(foodMacros(), props.quantity);

  return (
    <>
      <div class="row mb-2 g-0">
        <div class="col g-0">
          <div class="row g-0 bg-dark-grey">
            <div class="col ps-2">
              <Suspense fallback={<p>Loading...</p>}>
                <span class="fs-4">{props.food()?.name}</span>
              </Suspense>
            </div>
          </div>
          <div class="row bg-dark-grey g-0">
            <div class="col">
              <span class="ps-1">
                <MacroNutrients {...macros()} />
              </span>
            </div>
          </div>
        </div>
        <div class="col-1 g-0 bg-dark-grey d-flex justify-content-end">
          <span class="align-self-end p-1 pe-3">
            {props.quantity}g
          </span>
        </div>
        <div class="col col-2 col-sm-1 bg-dark-grey g-0 d-flex justify-content-center border-start border-dark">
          <div class="pt-2">
            <A href="/foods" >
              <ErrorBoundary fallback={(e) => <div>{e.message}</div>}>
                <i class="fas fa-edit fs-2 mt-2">asdf</i>
                <i class="bi bi-airplane">dd</i>
              </ErrorBoundary>
            </A>
          </div>
        </div>
      </div>
    </>
  );
}
//TODO: remove export
export const MealItemAdd: Component<MealItemProps> = () => {
  const { foods, meals, show, setShow } = useRouteData<typeof routeData>();

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
