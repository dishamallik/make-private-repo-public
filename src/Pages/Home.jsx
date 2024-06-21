import Banner from "./Banner";
import ExtraSection from "./ExtraSection";
import Top from "./Top";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Top></Top>
            <div className="">
            <ExtraSection></ExtraSection>
            </div>
        </div>
    );
};

export default Home;