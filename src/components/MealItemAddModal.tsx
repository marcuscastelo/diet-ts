import { Modal } from "solid-bootstrap";
import { Accessor, Component, Resource, Setter, Suspense } from "solid-js";
import MealItemAddBody from "./MealItemAddBody";
import { FoodData } from "~/model/foodModel";
import { MealItemAddData } from "~/model/mealItemModel";

type MealItemAddModalProperties = {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    foods: Resource<FoodData[]>;
    onSave: (mealItem: MealItemAddData) => void;
    onCancel: () => void;
}

const MealItemAddModal: Component<MealItemAddModalProperties> = (props) => {
    const {show, setShow, foods} = props;
    const handleClose = () => setShow(false);

    const onSave = (mealItem: MealItemAddData) => {
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
                    <MealItemAddBody foods={foods} onSave={onSave} onCancel={onCancel}/>
                </Suspense>
            </Modal.Body>
        </Modal>
    );
}

export default MealItemAddModal;