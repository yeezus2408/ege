import { Box, Button, Card, Checkbox, EmptyState, Text, Field, FieldErrorText, Input, SimpleGrid, Stack, Heading, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../store/hooks";
import { CourseService } from "../../services/course.service";
import { ICourses } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";

export default function Main(): JSX.Element{
    const navigate = useNavigate()
    const dispath = useAppDispatch();
    const [courses, setCourses] = useState<ICourses[] | null>(null);
    const CourseCard = ({ course } : {course: ICourses}) => {
    return (
        <Card.Root w={500} bgColor={"gray.800"} borderColor={"gray.700"} borderWidth={1} borderRadius="lg" margin={"10px"}>
            <Card.Body>
                <Card.Title color={"whiteAlpha.800"} marginBottom={4} textAlign={"center"}>
                    {course.name}
                </Card.Title>
                <Text color={"whiteAlpha.600"} textAlign={"center"}>
                    {course.description || 'No description available.'}
                </Text>
            </Card.Body>
            <Card.Footer display={"flex"} justifyContent={"space-evenly"} padding={4} >
                <Text fontWeight={"bold"} color={"whiteAlpha.800"}>{course.price} RUB</Text>
                <Button marginRight={"0px"} variant={"solid"} colorScheme="teal" >
                    <Link to={`course/getCourse/${course.id}`}>
                        Подробнее
                    </Link>
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};
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




    return (
            <Box maxW={'full'} display={'flex'} justifyContent={'center'} p={5}>
            <Box mb={5}>
              
            </Box>
            <SimpleGrid columns={[1, 2, 3]} marginTop={'100px'}>
                {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </SimpleGrid>
        </Box>
    )
}