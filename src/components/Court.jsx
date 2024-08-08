import { FaPlus } from "react-icons/fa";

const Court = () => {
  const court = [
    {
      name: "John Doe",
      fullName: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "1234567890",
      rank: "Vice President",
      status: "Active",
    },
    {
      name: "Jane Smith",
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      phoneNumber: "0987654321",
      rank: "Manager",
      status: "Inactive",
    },
    {
      name: "Mike Johnson",
      fullName: "Mike Johnson",
      email: "mikejohnson@example.com",
      phoneNumber: "9876543210",
      rank: "Head Coach",
      status: "Active",
    },
    {
      name: "Sarah Williams",
      fullName: "Sarah Williams",
      email: "sarahwilliams@example.com",
      phoneNumber: "12345678",
      rank: "Manager",
      status: "Active",
    },
  ];
  return (
    <div className="relative">
      <h1 className="text-2xl text-[#033987] font-bold border-b border-[#C6C61A] mb-[32px] py-6">
        Manage Court Group
      </h1>
      <div className="absolute top-5 right-0 border border-[#C6C61A] rounded-lg p-2 bg-[#C6C61A] text-white">
        <button
          className="flex items-center gap-2"
          // onClick={handleAddButtonClick}
        >
          <FaPlus />
          Add Court Group
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <table className="table-auto w-full text-left cursor-pointer">
          <thead className="text-white bg-[#155ABE] pl-[20px] h-[56px]">
            <tr>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Court Name
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Address
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Email Contact
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Phone Number
              </th>
              <th className="border border-slate-400 pl-[20px] h-[56px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {court.map((user, index) => (
              <tr
                key={index}
                //   onClick={() => handleUpdateButtonClick(user)}
              >
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.userName}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.fullName}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.email}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  {user.phoneNumber}
                </td>
                <td className="border border-slate-300 pl-[20px] h-[48px]">
                  <div
                    className={`status-item ${
                      user.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    <span
                      className={`status-dot ${
                        user.status === "Active" ? "dot-active" : "dot-inactive"
                      }`}
                    ></span>
                    <span className="mr-[5px]">
                      {user.status === "Active" ? "Active" : "Deactivate"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Court;
