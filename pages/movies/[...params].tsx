import axios from "axios";
import Seo from "../../components/Seo";

export default function Detail({ movieDetail }: any) {
  return (
    <div className="container">
      <Seo title={movieDetail?.original_title} />
      <div className="movieInfo">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`}
          alt="img"
          className="mainImg"
        />
        <div className="movieDetail">
          <h2 className="movieTitle">{movieDetail?.title}</h2>
          <div className="tagListBox">
            <span className="tag">Tag</span>
            <div className="tagList" id="tagList">
              {movieDetail?.genres.map(
                ({ name: name }: { name: any }, index: any) => (
                  <div className="tagItem" key={index}>
                    {name}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="movieDatas">
            <div className="movieData">
              <div className="datalist">
                <p className="dataTopic">제작 :</p>
                {` ${movieDetail?.production_countries[0].iso_3166_1} / ${movieDetail?.production_countries[0].name}`}
              </div>
              <div className="datalist">
                <p className="dataTopic">개봉일 : </p>
                {`${movieDetail?.release_date}`}
              </div>
              <div className="datalist">
                <p className="dataTopic">런타임 : </p>
                {`${movieDetail?.runtime}m`}
              </div>
              <div className="datalist">
                <p className="dataTopic">언어 :</p>
                {`${movieDetail?.spoken_languages.map(
                  (v: { english_name: any }) => v.english_name,
                )}`}
              </div>
              <div className="datalist">
                <p className="dataTopic">평점 : </p>
                {`${movieDetail?.vote_average.toFixed(1)}`}
              </div>
              <div className="datalist">
                <p className="dataTopic">누적 관객수 : </p>
                {`${movieDetail?.popularity.toFixed(0)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Summary</h2>
      <div className="overview">
        <span>{movieDetail?.overview}</span>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        .movieInfo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          padding-bottom: 10px;
          border-bottom: 1px solid #000;
        }
        .mainImg {
          width: 300px;
          height: 100%;
          border-radius: 16px;
          margin-bottom: 30px;
          margin: 20px 20px 20px 0;
        }
        .tagListBox {
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          align-items: center;
          justify-content: start;
        }
        .tagListBox .tag {
          font-size: 16px;
          font-weight: 600;
          background: #712;
          color: #fff;
          padding: 8px 20px;
          margin-right: 10px;
        }
        .tagListBox .tagList {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          overflow: scroll;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;
          border-left: 2px solid #ddd;
          padding-left: 10px;
        }
        .tagListBox .tagList::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
        .tagListBox .tagItem {
          font-size: 12px;
          padding: 8px 20px;
          margin-right: 10px;
          border: 1px solid #434141;
          white-space: nowrap;
        }
        .movieDatas {
          width: 850px;
          display: flex;
          flex-wrap: nowrap;
          box-sizing: border-box;
          margin: 10px 0;
        }
        .movieDatas .movieData {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 10px 0;
        }
        .movieDatas .movieData div {
          font-size: 14px;
          border-bottom: 1px solid #e0e0e0;
        }
        .movieTitle {
          margin: 10px 0;
          width: 100%;
          padding-bottom: 20px;
          border-bottom: 1px solid #000;
        }
        .overview {
          width: 100%;
          line-height: 1.7;
          word-break: normal;
        }
        .movieDetail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .datalist {
          display: flex;
          align-items: center;
        }
        .dataTopic {
          font-weight: bold;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params: { params } }: any) {
  const movieDetail = await (
    await axios.get(
      `https://movie-trailers-tau.vercel.app/api/movies/${params[1]}`,
    )
  ).data;
  return {
    props: {
      movieDetail,
    },
  };
}
