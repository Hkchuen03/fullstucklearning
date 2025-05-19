import Part from './part'

const Header = (props) => {
    return <h2>{props.name}</h2>
}
  
const Content = ({parts}) => {
    return (
        <div>
        <ul>
            {parts.map((part) => (
            <Part key={part.id} part={part} />
            ))}
        </ul>
        </div>
    )
}

const Total = ({parts}) => {
    const initialValue = 0;

    const total = parts.reduce((s, p) => {
        return s + p.exercises
    }, initialValue)



    return (
        <div>
        <p>total of {total} exercises</p>
        </div>
    )
}

const Course = (props) => {
    return (
        <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
        </div>
    )
}
  
  

export default Course