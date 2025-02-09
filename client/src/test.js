import axios from "axios";

const print = async () =>{
    const res = await axios.get("https://services.gst.gov.in/services/api/search/goodservice?gstin=29AAICR1034J1ZA");
    console.log(res.data);
}

print();