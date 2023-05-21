import { Component } from "solid-js";

import './Profile.scss'

const Profile: Component = () => {
    return (
        <>
            <div class="bg-secondary container pt-3">
                <div class="row g-0">
                    <div class="col-3 mx-auto capsule text-center border">
                        <img src="/profile.jpeg" class="img-thumbnail" ></img>
                    </div>
                </div>

                <div class="row g-0">
                    <h1 class="text-center">Simone Castelo Branco Martins</h1>
                </div>
                <div class="row g-0">
                    <h3 class="text-center">Informações principais</h3>
                </div>
                <div class="row g-0 mx-5">
                    <Capsule title="Peso(kg)" content="86" />
                </div>
                <div class="row g-0 mx-5">
                    <Capsule title="Altura(cm)" content="167" />
                </div>
                <div class="row g-0 mx-5">
                    <Capsule title="Objetivo" content="Perder peso" />
                </div>
                <div class="row g-0 mx-5">
                    <Capsule title="Nível de atividade" content="Intermediário" />
                </div>
                <div class="row g-0">
                    <div class="col-9 mx-auto">
                        <div class="row g-0">
                            <button class="btn btn-primary w-100 my-2 p">Editar</button>
                        </div>
                    </div>
                </div>
                <div class="row g-0">
                    <div class="col-10 mx-auto">
                        <div class="row g-0 d-flex justify-items-between">
                            <div class="col-5 mx-auto">
                                <button class="btn btn-light w-100 my-2 p">Dieta</button>
                            </div>
                            <div class="col-5 mx-auto">
                                <button class="btn btn-dark w-100 my-2 p">Treino</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

type CapsuleProps = {
    title: string,
    content: string
}

const Capsule: Component<CapsuleProps> = (props: CapsuleProps) => {
    return (
        <>
            <div class="col-6 mx-auto bg-dark capsule my-2 mx-3">
                <div class="row g-0">
                    <div class="col bg-dark-grey p-2 ps-3">
                        {props.title}
                    </div>
                    <div class="col bg-dark p-2 ps-3">
                        <b>{props.content}</b>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Profile;