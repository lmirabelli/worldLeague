import './index.css'
import { Link } from "react-router-dom"

export const Index = () => {

    return (
        <div className='menuIndex'>
            <div className='optionsMenu'>
                <h2>Ligas</h2>
                <Link to="/league/platiniumDivision">Platinium</Link>
                <Link to="/league/goldDivision">Gold</Link>
                <Link to="/league/silverDivision">Silver</Link>
                <Link to="/league/bronzeDivision">Bronze</Link>
                <Link to="/league/medium1Division">Medium 1</Link>
                <Link to="/league/medium2Division">Medium 2</Link>
                <Link to="/league/medium3Division">Medium 3</Link>
                <Link to="/league/medium4Division">Medium 4</Link>
                <Link to="/league/lower1Division">Lower 1</Link>
                <Link to="/league/lower2Division">Lower 2</Link>
                <Link to="/league/lower3Division">Lower 3</Link>
                <Link to="/league/lower4Division">Lower 4</Link>
            </div>
        </div>
    )
}