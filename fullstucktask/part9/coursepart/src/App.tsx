interface CourseNameProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special"
}

interface CoursePartsProps {
  courseParts: CoursePart[];
}

interface CoursePartProps {
  coursePart: CoursePart;
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface TotalProps {
  total: number;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: CourseNameProps) => {
  return (
    <h1>{props.name}</h1>
  );
}

const Part = (props: CoursePartProps) => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
        </div>
      );
      break;
    case "group":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>project exercises {props.coursePart.groupProjectCount}</p>
        </div>
      );
      break;
    case "background":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
          <p>submit to {props.coursePart.backgroundMaterial}</p>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <h2>{props.coursePart.name} {props.coursePart.exerciseCount}</h2>
          <p>{props.coursePart.description}</p>
          <p>required skills: {props.coursePart.requirements.map((value: string) => (value)).join(' ')}</p>
        </div>
      );
      break;
    default:
      return assertNever(props.coursePart);
  }
}

const Content = (props: CoursePartsProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </div>
  );
}

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;