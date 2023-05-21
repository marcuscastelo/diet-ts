import { Component } from "solid-js"

import './CircleProgressBar.scss'

const CircleProgressBar: Component<any> = ({ progress, class: cls }: any) => <>
    <div class={"progress-circle blue " + cls}>
    <span class="progress-circle-left">
        <span class="progress-circle-bar"></span>
    </span>
    <span class="progress-circle-right">
        <span class="progress-circle-bar"></span>
    </span>
    <div class="progress-circle-value">10%</div>
  </div>
</>;

export default CircleProgressBar;