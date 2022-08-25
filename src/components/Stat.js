import React from 'react'
import "../style/statStyle.css"
import { ArrowRight } from 'react-bootstrap-icons';



const Stat = ({ title, val, icon: Icon }) => {
    return (
        <div class="col-xl-6 col-lg-5 mt-3" >
            <div class="card card-stats mb-4 mb-xl-0" style={{ backgroundColor: "black" }}>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm">
                            <h5 class="card-title text-uppercase text-white mb-0">{title}</h5>
                            <span class="h2 font-weight-bold mb-0" style={{ color: "#8b98ff" }}>{val}</span>
                        </div>
                        <div class="col-sm" style={{ textAlign: "right" }}>
                            <div class="icon icon-shape rounded-circle shadow" style={{ height: "auto", width: "auto", color: "black", backgroundColor: "#8b98ff" }}>
                                <Icon size={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stat
