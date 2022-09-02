import React from 'react'
import "../style/statStyle.css"
import { ArrowRight } from 'react-bootstrap-icons';



const Stat = ({ title, val, icon: Icon }) => {
    return (
        <div className="col-xl-6 col-lg-5 mt-3" >
            <div className="card card-stats mb-4 mb-xl-0" style={{ backgroundColor: "black" }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm">
                            <h5 className="card-title text-uppercase text-white mb-0">{title}</h5>
                            <span className="h2 font-weight-bold mb-0" style={{ color: "#8b98ff" }}>{val}</span>
                        </div>
                        <div className="col-sm" style={{ textAlign: "right" }}>
                            <div className="icon icon-shape rounded-circle shadow" style={{ height: "auto", width: "auto", color: "black", backgroundColor: "#8b98ff" }}>
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
