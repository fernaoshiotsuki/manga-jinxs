import axios from "axios";
import { useContext } from "react";
import { MangaContext } from "../../Providers/Mangas";
import { useState } from "react";
import { useEffect } from "react";
import { StyledHeader } from "../../components/HeaderStyle/styles";
import { StyledFooter } from "../../components/Common Styles/styles";
import { StyledPage } from "./styles";
import { useHistory } from "react-router-dom";

const MangaReader = () => {
  const history = useHistory();
  const { data, url, getMangaPage } = useContext(MangaContext);
  const [page, setPage] = useState("");
  const [num, setNum] = useState(0);
  const [display, setDisplay] = useState(false);

  const getPageURL = (num) => {
    axios
      .get(`${url}/data/${data.attributes.hash}/${data.attributes.data[num]}`)
      .then((res) => {
        setPage(res.config.url);
      })
      .catch((err) => console.log(err));
  };

  const handlePage = () => {
    setNum(num + 1);
  };
  const handlePageBefore = () => {
    setNum(num - 1);
  };

  useEffect(() => {
    if (data.id) {
      getMangaPage(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data.attributes) {
      getPageURL(num);
      setDisplay(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, handlePage, handlePageBefore]);

  return (
    <>
      {display && (
        <>
          <StyledHeader>
            <button onClick={() => history.push("/")}>Home</button>
            <button onClick={() => history.push("/manga")}>Mangas</button>
            <button onClick={() => history.push("/manga/chapters")}>
              Capitulos
            </button>
          </StyledHeader>

          <StyledPage>
            {page ? (
              <img src={page} alt="MangaPage"></img>
            ) : (
              <img
                src="https://i.pinimg.com/564x/8a/1d/4c/8a1d4c89eca6dbf42f84fab747f8ff8e.jpg"
                alt="MangaPage"
              ></img>
            )}
          </StyledPage>

          <StyledFooter>
            <button onClick={() => handlePageBefore()}>Past</button>
            <p>{num}</p>
            <button onClick={() => handlePage()}>Next</button>
          </StyledFooter>
        </>
      )}
    </>
  );
};
export default MangaReader;
