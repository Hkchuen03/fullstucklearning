import Person from "./Person";

const Persons = ({persons, deletePerson}) => {
    return (
        <ul>
            {persons.map((person) => (
                <Person 
                    key={person.name} 
                    person={person} 
                    deletePerson={() => deletePerson(person.id)}
                />
            ))}
        </ul>
    )
}

export default Persons