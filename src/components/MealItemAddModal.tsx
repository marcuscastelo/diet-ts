import { Modal } from "solid-bootstrap";
import { Accessor, Component, Setter, Signal, Suspense, createContext, createSignal, useContext } from "solid-js";
import { MealData } from "~/model/mealModel";
import MealItemAddBody from "./MealItemAddBody";
import { FoodData } from "~/model/foodModel";
import { mockFoods } from "~/routes/test/mock/foodMock";
import { MealItemAddData } from "~/model/mealItemModel";

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

type MealItemAddModalProperties = {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    foods: Accessor<FoodData[]>;
    onAdd: (mealItem: MealItemAddData) => void;
    onCancel: () => void;
}

const MealItemAddModal: Component<MealItemAddModalProperties> = (props) => {
    const {show, setShow, foods} = props;
    const handleClose = () => setShow(false);

    const onAdd = (mealItem: MealItemAddData) => {
        props.onAdd(mealItem);
        handleClose();
    };

    const onCancel = () => {
        props.onCancel();
        handleClose();
    };
    
    return (
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
                    <MealItemAddBody foods={foods} onAdd={onAdd} onCancel={onCancel}/>
                </Suspense>
            </Modal.Body>
        </Modal>
    );
}

export default MealItemAddModal;