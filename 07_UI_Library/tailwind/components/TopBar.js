
import ThemeSwitch from '../components/ThemeSwitch';

function TopBar() {
    return (
        // 최대 width가 100%, 배경색이 초록색, 패딩이 0.5rem 
        <div className="w-full p-2 bg-green-500">
            <div className="w-10/12 m-auto">
                <ThemeSwitch />
            </div>
        </div>
    );
};

export default TopBar;
