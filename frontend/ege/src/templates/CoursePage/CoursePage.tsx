import { Box, Button, Card, Field, Flex, Icon, Input,  Stack, Text} from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { BsStar } from 'react-icons/bs';
import { useParams } from "react-router-dom";
import { IComment, ICourses } from "../../types/types";
import { CourseService } from "../../services/course.service";
import { getUsername } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const CoursePage: React.FC = () => {
  const { id } = useParams();
  const [hover, setHover] = useState<number>(0);

  const courseId = id ?? '';
  const [rating, setRating] = useState<number>(0);
  const [author, setAuthor] = useState(getUsername())
  if(!author) setAuthor("Аноним");
  const [course, setCourse] = useState<ICourses | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [content, setNewContent] = useState('');


  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  const toggleLesson = (id: string) => {
    setOpenLessonId(prev => (prev === id ? null : id));
  };


  const handleAddComment = async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        const newComment: IComment = { content, author };
        await CourseService.addComment(courseId, newComment);
        setComments((prev) => (prev ? [...prev, newComment] : [newComment]));
        setNewContent('');
              toast.success("Posted")
              
      } catch (error) {
          console.error('Comment Failed', error);
          toast.error("Error")
      }
          // console.log(role);
          
    
      };

      const sendStar = async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        await CourseService.sendStar(courseId, rating);
              toast.success("Access")
              
      } catch (error) {
          console.error('Comment Failed', error);
          toast.error("Error")
      }
          // console.log(role);
          
    
      };

    const getCourseById = async () => {

        try {
            const response = await CourseService.getCourseById(courseId);
            if (Array.isArray(response)) {
                setCourse(response);
            } else if (response) {
                setCourse(response);
            }
        } catch (error) {
            console.error("Ошибка при получении курса:", error);
        }
    }

    const getCommentsByCourse = async () => {

        try {
            const response = await CourseService.getCommentsByCourse(courseId);
            if (Array.isArray(response)) {
                setComments(response);
            } else if (response) {
                setComments([response]);
            }
        } catch (error) {
            console.error("Ошибка при получении курса:", error);
        }
    }
    
    useEffect(() =>  {
    getCourseById(),
    getCommentsByCourse()
    }, [])

//   if (loading) {
//     return (
//       <Box maxW="full" display="flex" justifyContent="center" pt={20}>
//         <Spinner size="xl" color="whiteAlpha.800" />
//       </Box>
//     );
//   }

  if (!course) {
    return (
      <Box maxW="full" display="flex" justifyContent="center" pt={20}>
        <Text color="whiteAlpha.800">Курс не найден.</Text>
      </Box>
    );
  }

  return (
    <Box maxW="full" display="flex" justifyContent="center" p={4} pt="80px">
      <Card.Root w={1500} bgColor="gray.800" borderColor="gray.700">
        <Card.Body>
          <Card.Title color="whiteAlpha.800" marginBottom={6} textAlign="center">
            {course.name}
          </Card.Title>
          <Stack gap={5}>
          <Flex justifyContent="flex-end" mb={4}>
            <Field.Root maxW="200px" w="full">
              <Field.Label color="whiteAlpha.800">Ваша оценка курсу</Field.Label>
              <Flex gap={1} mb={2} justifyContent="flex-end">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    as={BsStar}
                    key={star}
                    boxSize={6}
                    cursor="pointer"
                    color={(hover || rating) >= star ? "yellow.400" : "gray.500"}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  />
                ))}
              </Flex>
              <Button colorScheme="yellow" onClick={sendStar}>
                Оценить
              </Button>
            </Field.Root>
              <Field.Root>
            <Field.Label color="whiteAlpha.800">Средняя оценка</Field.Label>
            <Text color="yellow.300" fontSize="xl">
              {course?.starRiting?.length
                ? (
                    course.starRiting.reduce((a, b) => a + b, 0) / course.starRiting.length
                  ).toFixed(1)
                : "Пока нет оценок"}
            </Text>
          </Field.Root>

          </Flex>
        
            <Field.Root>
            <Field.Label color="whiteAlpha.800">Уроки: </Field.Label>
                <Stack margin={'10px'} justifyContent={"center"} w={'full'}>
                    {course.lessons && course.lessons.length > 0 ? (
                        course.lessons.map((lesson, index) => (
                        <Box
                            key={lesson.id}
                            borderWidth={1}
                            borderColor="gray.700"
                            borderRadius="md"
                            p={4}
                            bg="gray.700"
                            cursor="pointer"
                            onClick={() => toggleLesson(lesson.id)}
                        >
                            <Text color="whiteAlpha.800" fontWeight="bold">
                            {index + 1}. {lesson.title}
                            </Text>

                            {openLessonId === lesson.id && (
                            <Text mt={2} color="whiteAlpha.700">
                                {lesson.description || 'Описание отсутствует'}
                            </Text>
                            )}
                        </Box>
                        ))
                    ) : (
                        <Text color="whiteAlpha.500">Нет доступных уроков</Text>
                    )}
                </Stack>
            </Field.Root>

            <Field.Root>
              <Field.Label color="whiteAlpha.800">Автор</Field.Label>
              <Text color="whiteAlpha.800">{course.author_id}</Text>
            </Field.Root>
            <Field.Root>


            <Field.Label color="whiteAlpha.800">Комментарии</Field.Label>
            <Box mt={4} w={"full"}>
                <Field.Root>
                <Field.Label color="whiteAlpha.800">Ваш комментарий</Field.Label>
                <Input
                    id="content"
                    placeholder="Напишите что-нибудь..."
                    value={content}
                    onChange={(e) => setNewContent(e.target.value)}
                    color="whiteAlpha.800"
                    borderColor="gray.700"
                />
                </Field.Root>
                <Button
                mt={2}
                onClick={handleAddComment}
                colorScheme="blue"
                variant="solid"
                >
                Отправить
                </Button>
            </Box>
            <Stack margin={3} mt={2}>
                {comments && comments.length > 0 ? (
                    comments?.map((comment) => (
                    <Box
                    borderWidth={1}
                    borderColor="gray.700"
                    borderRadius="md"
                    p={3}
                    bg="gray.700"
                    >
                    <Text color="whiteAlpha.800" fontWeight="semibold">
                        {comment?.author || 'Аноним'}
                    </Text>
                    <Text color="whiteAlpha.600">{comment.content}</Text>
                    </Box>
                ))
                ) : (
                <Text color="whiteAlpha.500">Комментариев пока нет</Text>
                )}
            </Stack>
            </Field.Root>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default CoursePage;