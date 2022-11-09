import './app-info.css';

const AppInfo = (props) => {
    const {increasd, emploees} = props
 
    return(
        <div className="app-info">
            <h1>Учет сотрудников в компании "Две колбаски"</h1>
            <h2>Общее число сотрудников: {emploees} </h2>
            <h2>Премию получат: {increasd} </h2>

        </div>
    )
}

export default AppInfo;