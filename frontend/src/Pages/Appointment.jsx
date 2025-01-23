// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext } from '../Context/AppContext'
// import { assets } from '../assets/assets'

// const Appointment = () => {
//   const {docId} = useParams()
//   const {doctors,currencySymbol} = useContext(AppContext)
//   const [docInfo,setDocInfo] = useState(null)
//   const [doctorSlot,setDoctorSlot] = useState([])
//   const [slotIndex,setSlotIndex] = useState(0)
//   const [slotTime,setSlotTime] = useState("")


//   const fetchDocInfo = async ()=>{
//     const docInfo = doctors.find(doc => doc._id===docId)
//     setDocInfo(docInfo)
//     // console.log(docInfo)
//   }

// const getAvailableSlots =  async ()=>{
//    setDoctorSlot([])

//   //  getting current data
//   let today = new Date()

//   for(let i = 0; i < 7 ; i++){
//     // getting date with index
//     let currentDate = new Date(today)
//     currentDate.setDate(today.getDate() + i)

//     // setting time of the date with index
//     let endTime = new Date()
//     endTime.setDate(today.getDate() + i)
//     endTime.setHours(21, 0, 0, 0)

//     // setting hours
//     if(today.getDate() ===  currentDate.getDate()){
//       currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//       // currentDate.setMinutes(currentDate.setMinutes() > 30? 30 : 0)
//       currentDate.setMinutes(currentDate.getMinutes() + 30);

//     }else{
//       currentDate.setHours(10)
//       currentDate.setMinutes(10)
//     }
//     let timeSlots = []
//     while(currentDate < endTime){
//       let formattedTime = currentDate.toLocaleTimeString([],{ hour: '2-digit',minute: '2-digit'})

//       // add to slot array
//       timeSlots.push({
//         datetime : new Date(currentDate),
//         time:formattedTime
//       })


//       // Increment time by 30 min
//       currentDate.setMinutes(currentDate.getMinutes())+30
//     }
//     setDoctorSlot(prev=>([...prev,timeSlots]))
//   }
// }


//   useEffect(()=>{
// fetchDocInfo()
//   },[doctors,docId])

// useEffect(()=>{
// getAvailableSlots()
// },[docInfo])

// useEffect(()=>{
//   console.log(doctorSlot)
// },[doctorSlot])

//   return docInfo &&(
//     <div>
//       {/* ------doctor details-------- */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         </div>
//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/* ---------Doc info:name,degree,experience---------- */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div>
//             <p className='flex items-center gap-2 text-sm mt-1 text-gray-600'>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>
//           {/* -----doc about-------- */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>
        
//     </div>
//   )
// }

// export default Appointment



import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext.jsx';
import { assets } from '../assets/assets';
import RelatedDoc from '../Components/RelatedDoc';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const navigate = useNavigate()
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl , token,getDoctorsData} = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docInfo, setDocInfo] = useState(null);
  const [doctorSlot, setDoctorSlot] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDocInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotDate = day+"_"+month+"_"+year
        const slotTime = formattedTime

        // const isSlotAvailable = docInfo.slotsBooked[slotDate] && docInfo.slotsBooked[slotDate].includes(slotTime)? false:true
        //  if(isSlotAvailable){
        //   timeSlots.push({
        //     datetime: new Date(currentDate),
        //     time: formattedTime,
        //   });
          
        //  }
        const isSlotAvailable = 
    docInfo?.slotsBooked?.[slotDate] && 
    docInfo.slotsBooked[slotDate].includes(slotTime)
        ? false 
        : true;

if (isSlotAvailable) {
    timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
    });
}


        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDoctorSlot(allSlots);
  };



  const bookAppointment = async ()=>{
    if(!token){
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }
    try {
      const date = doctorSlot[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day +"_" + month +"_"+ year
      // console.log(slotDate)
      const {data} = await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

//   const bookAppointment = async () => {
//     if (!token) {
//         toast.warn('Login to book Appointment');
//         return navigate('/login');
//     }

//     try {
//         // Validate doctorSlot and slotIndex
//         if (!doctorSlot || !doctorSlot[slotIndex] || !doctorSlot[slotIndex][0]?.datetime) {
//             toast.error('Invalid slot selection. Please try again.');
//             return;
//         }

//         // Extract and format date
//         const date = doctorSlot[slotIndex][0].datetime;
//         const day = date.getDate();
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();

//         const slotDate = `${day}_${month}_${year}`;
//         console.log('Formatted Slot Date:', slotDate);

//         // Call backend API
//         const { data } = await axios.post(
//             `${backendUrl}/api/user/book-appointment`,
//             { docId, slotDate, slotTime },
//             { headers: { token } }
//         );

//         if (data.success) {
//             toast.success(data.message);
//             getDoctorsData(); // Refresh doctor data
//             navigate('/my-appointments'); // Navigate to appointments page
//         } else {
//             toast.error(data.message);
//         }
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
//     }
// };


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(doctorSlot);
  }, [doctorSlot]);

  return (
    docInfo && (
      <div>
        {/* ------doctor details-------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ---------Doc info:name,degree,experience---------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div>
              <p className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            {/* -----doc about-------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* -----Booking Slots------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              doctorSlot.length && doctorSlot.map((item,index)=>(
                  <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex=== index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
              ))
            }
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {doctorSlot.length && doctorSlot[slotIndex].map((item,index)=>(
                  <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime? 'bg-primary text-white ': 'text-gray-400 border border-gray-300'} `} key={index}>
                    {item.time.toLowerCase()}
                  </p>
            ))}
          </div>
          <button onClick={bookAppointment}  className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an Appointment</button>

        </div>
        {/* -----Listing related doctors-------- */}
        <RelatedDoc docId={docId} speciality={docInfo.speciality}  />
      </div>
    )
  );
};

export default Appointment;
