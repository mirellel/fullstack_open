const Header = ( {name} ) =>{
    console.log(name)
    return (
      <div>
        <h2>{name}</h2>
      </div>
      
    )
  }
  
  const Part = ({part}) => {
    console.log(part)
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Content = ({parts}) =>{
    console.log(parts)
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Course = ({course}) =>{
    console.log(course)
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((p, s) => p + s.exercises, 0)
  
    return(
      <div>
        <p>
          <b>total of {total} exercises</b>
        </p>
      </div>
    )
  
  }
  
  const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(course =>
          <Course key={course.id} course={course}/>
        )}
      </div>
    )
  }

  export default Courses