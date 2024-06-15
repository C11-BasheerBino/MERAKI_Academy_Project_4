import axios from "axios";
import React, { useEffect, useState } from "react";

const AddService =()=>{

    return(
        <div>
            <input type="text" placeholder="Service name" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="image link" />
            <input type="text" placeholder="Service Field" />
        </div>

    )
}


export default AddService