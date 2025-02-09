import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NegotiationCard } from "@/components/Negotiation-card";
import { NegotiationPreview } from "@/components/NegotiationPreview";
import { NegotiationDetail } from "@/components/utils/types";
// import { negotiationData } from "@/components/utils/data/NegotiationData";
import api, { profileRoute } from "@/api/axiosConfig";
import { negotiationRoute } from "@/api/axiosConfig";
import { Toaster } from "@/components/ui/toaster";

const Negotiations = () => {
  // const [ myTurn, setMyTurn] = useState(true);
  const [showONgoing, setShowOngoing] = useState(true);
  const [ViewDetail,setViewDetail] = useState(false);
  const [getData,setgetData] = useState<NegotiationDetail> ();
	const remove = ():void =>{
		setViewDetail(false);
	}
  const [negotiationData, setNegotiationData] = useState<any[]>([]);
  // const [currentTerms, setCurrentTerms] = useState<any[]>([]);
  useEffect(()=>{
    const getNegotiations = async () => {
      const me = await api.get(`${profileRoute}`);
      const response = await api.get(`${negotiationRoute}`);
      // setNegotiationData(response.data.negotiations);
      // setCurrentTerms(response.data.currentTerms);
      let res: any[] = [];
      response.data.negotiations.forEach((item: any) => {
        response.data.currentTerms.forEach((term: any) => {
          if(item.currentTermsId === term.id){
            let myTurn: boolean;
            if(item.turn === me.data.user.id) myTurn = true;
            else myTurn = false;
            res.push({...term, id: item.id, buyerName: "krishi co-operative", ongoing: item.ongoing, proposedPrice: term.price, myTurn: myTurn, currentTermsId: item.currentTermsId, status: item.status});
          }
        })
      })
      setNegotiationData(res);
      console.log(negotiationData);
      // setCurrentTerms(res);
    }
    getNegotiations();
  },[])
  return (
    <>
    <div className=" w-full  mt-6 bg-gradient-to-br from-white to-[#c8ffcc] pt-16">
      <h1 className="text-3xl text-green-800 text-center font-bold  mb-2">
        Negotiations
      </h1>

      <h3 className="text-1xl text-green-800 text-center  mb-2">You will see all your negotiations here</h3>
      <div className="flex space-x-2 mb-6 mx-5">
      <Button 
      // className="bg-green-900 font-bold"
      onClick={()=>setShowOngoing(true)}
      variant={showONgoing? 'default':'outline'}
      >Ongoing Negotiations</Button>
      <Button 
      // className="bg-green-900 font-bold"
      onClick={()=>setShowOngoing(false)}
      variant={showONgoing? 'outline':'default'}
      >Completed Negotiations</Button>
      </div>
      {
        //@ts-ignore
        ViewDetail?<NegotiationPreview negotiation={getData} closeDetail={remove}/>:
        <div className="grid gap-6 md:grid-cols-2     lg:grid-cols-3 px-5">
          {
            showONgoing? negotiationData.map(
              (item)=>(
                //@ts-ignore
                item.ongoing && <NegotiationCard key ={item.id} negotiation={item} setViewDetail={setViewDetail} setgetData={setgetData} myTurn={item.myTurn} currentTermsId={item.currentTermsId}/>
              )) :
              negotiationData.map(
                (item)=>(
                  //@ts-ignore
                  !item.ongoing && <NegotiationCard key ={item.id} negotiation={item} setViewDetail={setViewDetail} setgetData={setgetData}/>
              )
            )
          }
        </div>
      }
    </div>
    <Toaster />
    </>
  )
}

export default Negotiations;