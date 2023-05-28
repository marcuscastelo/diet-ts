import { Modal } from "solid-bootstrap";
import { Component, Signal, Suspense, createContext, createSignal, useContext } from "solid-js";
import { MealData } from "~/model/mealModel";

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

const MealItemAddModal: Component<MealData> = (props) => {
    const [show, setShow] = useModalShow();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    {/* <MealItemAdd
                {...meals()?.[0].items[0] ?? {} as MealItemProps} //TODO: fix this
              // {...meals[0]()[0].items[0][0]}
              /> */}
                </Suspense>
            </Modal.Body>
        </Modal>
    );
}s