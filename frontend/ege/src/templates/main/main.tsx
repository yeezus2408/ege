import { Box, Button, Card, Text, Input, SimpleGrid, Stack} from "@chakra-ui/react";
import { CourseService } from "../../services/course.service";
import { Select as ChakraSelect } from '@chakra-ui/select';
import { ICourses } from "../../types/types";
import { Link } from "react-router-dom";
import { JSX, useEffect, useState } from "react";

export default function Main(): JSX.Element{
    const [courses, setCourses] = useState<ICourses[] | null>(null);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState('');
  const [subject, setSubject] = useState('');
  const uniqueSubjects = [...new Set(courses?.map((c) => c.subject))];

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = price ? String(course.price) === price : true;
    const matchesSubject = subject ? course.subject === subject : true;
    return matchesSearch && matchesPrice && matchesSubject;
  });
     const CourseCard = ({ course }: { course: ICourses }) => (
    <Card.Root
      w={500}
      bgColor={"gray.800"}
      borderColor={"gray.700"}
      borderWidth={1}
      borderRadius="lg"
      margin={"10px"}
    >
      <Card.Body>
        <Card.Title
          color={"whiteAlpha.800"}
          marginBottom={4}
          textAlign={"center"}
        >
          {course.name}
        </Card.Title>
        <Text color={"whiteAlpha.600"} textAlign={"center"}>
          {course.description || "No description available."}
        </Text>
      </Card.Body>
      <Card.Footer display={"flex"} justifyContent={"space-evenly"} padding={4}>
        <Text fontWeight={"bold"} color={"whiteAlpha.800"}>
          {course.price} RUB
        </Text>
        <Button variant={"solid"} colorScheme="teal">
          <Link to={`course/getCourse/${course.id}`}>Подробнее</Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
    const getAllCourses = async () => {

        try {
            const response = await CourseService.getAllCourses();
            if (Array.isArray(response)) {
                setCourses(response);
            } else if (response) {
                setCourses([response]);
            }
        } catch (error) {
            console.error("Ошибка при получении курсов:", error);
        }
    }
    
      useEffect(() =>  {
        getAllCourses()
      }, [])

  if (!courses) {
      return (
        <Box maxW="full" display="flex" justifyContent="center" pt={20}>
          <Text color="whiteAlpha.800">Список курсов пуст.</Text>
        </Box>
      );
  }


    return (
    <Box maxW="full" display="flex" flexDirection="column" alignItems="center" p={5}>
      <Box >
        <Stack direction={["column", "row"]} marginTop={'80px'} justify={'center'}>
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          width="350px"
        />

        <Input 
        placeholder="Введите цену"
        value={price}
        width={'250px'}
        onChange={(e) => setPrice(e.target.value)}
        />
        <ChakraSelect
          placeholder="Выберите предмет"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          width="200px"
        >
          {uniqueSubjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </ChakraSelect>
      </Stack>

      </Box>
      <SimpleGrid columns={[1, 2, 3]} marginTop={"40px"}>
        {filteredCourses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
    </Box>
  );
}