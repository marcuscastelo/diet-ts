import { Modal } from "solid-bootstrap";
import { Accessor, Component, Resource, Setter, Suspense } from "solid-js";
import MealItemEditBody from "./MealItemEditBody";
import { FoodData } from "~/model/foodModel";
import { MealItemData, MealItemEditData } from "~/model/mealItemModel";
import { mockFoods } from "~/routes/test/mock/foodMock";

type MealItemEditModalProperties = {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    mealItem: MealItemEditData;
    foods: Resource<FoodData[]>;
    onSave: (mealItem: MealItemEditData) => void;
    onCancel: () => void;
}

const MealItemEditModal: Component<MealItemEditModalProperties> = (props) => {
    const {show, setShow, foods, mealItem} = props;
    const handleClose = () => setShow(false);

    const onSave = (mealItem: MealItemEditData) => {
        props.onSave(mealItem);
        handleClose();
    };

    const onCancel = () => {
        props.onCancel();
        handleClose();
    };

    return (
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
                    <MealItemEditBody mealItem={mealItem} foods={foods} onSave={onSave} onCancel={onCancel}/>
                </Suspense>
            </Modal.Body>
        </Modal>
    );
}

export default MealItemEditModal;