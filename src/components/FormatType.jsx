import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import defaultImg from "../images/defaultImg.png";

const FormatType = () => {
  const [tournaments, setTournaments] = useState([]);
  const { id } = useParams();
  const URL = "http://localhost:5000/campaign";

  const getAllTournament = async () => {
    try {
      const res = await axios.get(`${URL}/${id}`);
      if (res.status === 200) {
        setTournaments(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTournament();
    console.log(tournaments);
  }, []);

  return (
    <div className="bg-[#EFEFEF] py-[48px] px-[16px] sm:px-[48px] md:px-[96px] lg:px-[216px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tournaments.length > 0 ? (
        tournaments.map((tournament) => (
          <Link to={`/test/${tournament.tournamentId}`}>
            <div key={tournament.tournamentId}>
              <div className="flex flex-col max-w-[488px] hover:bg-white group hover:rounded-lg">
                <img
                  src={tournament.img ? tournament.img : defaultImg}
                  alt={tournament.tournamentId}
                  className="max-w-[488px] min-h-[366px]"
                />
                <div>
                  <h1 className="text-3xl font-bold ml-4 group-hover:text-[#C6C61A]">
                    {tournament.tournamentName}
                  </h1>
                  <div className="ml-4 pb-4">
                    Rounds and KnockOut | Pickle Ball
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default FormatType;
