
const BookingCard = ({ booking }) => {
  const { tourName, totalPrice, maxGroupSize, date, _id } = booking;

 



  return (
    <>
      <tbody className="rounded overflow-hidden  py-8 px-3 bg-gray-100 shadow-lg">
        <tr className="w-full text-center overflow-hidden">
          <td className="tableData text-start">{tourName}</td>
          <td className="hidden md:table-cell tableData">{maxGroupSize}</td>
          <td>{date}</td>
          <td>{totalPrice}</td>
        </tr>
      </tbody>
    </>
  );
};

export default BookingCard;
