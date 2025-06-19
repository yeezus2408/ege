import { SyntheticEvent, useState } from "react";
import { JSX } from "react";
import { toast } from "react-toastify";
import { Box, Button, Card, Field, FieldErrorText, Input, Stack } from "@chakra-ui/react";
import { CourseService } from "../../services/course.service";

export default function CreateCourse(): JSX.Element{
    const [course_name, setName] = useState('');
    const [course_description, setDescription] = useState('');
    const [course_price, setPrice] = useState('');
    const [course_subject, setSubject] = useState('');

    const [nameErrorMessage] = useState('');
    const [descriptionErrorMessage] = useState('');
    const [priceErrorMessage] = useState('');
    const [subjectErrorMessage] = useState('');

    const handleCreateCourse = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
        const response = await CourseService.createCourse({course_name, course_description, course_price, course_subject});
        if(response){
            
            toast.success("Successful")
        }
    } catch (error) {
        toast.error("Error")
    }
        // console.log(role);
        
  
    };






    return (
            <Box maxW={'full'} display={'flex'} justifyContent={'center'} marginTop={'250px'}>
                <Card.Root w={600} bgColor={'gray.800'} borderColor={'gray.700'}>
                    <Card.Body>
                    <Card.Title color={'whiteAlpha.800'} marginBottom={8} textAlign={'center'}>
                        Create Course
                    </Card.Title>
                    <Stack gap={7}>
                        <Field.Root>
                        <Field.Label color={'whiteAlpha.800'}>Course Name</Field.Label>
                        <Input
                            placeholder="Enter course name"
                            type="text"
                            id="name"
                            name="name"
                            borderColor={'gray.700'}
                            color={'whiteAlpha.800'}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FieldErrorText>{nameErrorMessage}</FieldErrorText>
                        </Field.Root>

                        <Field.Root>
                        <Field.Label color={'whiteAlpha.800'}>Description</Field.Label>
                        <Input
                            placeholder="Enter course description"
                            type="text"
                            id="description"
                            name="description"
                            borderColor={'gray.700'}
                            color={'whiteAlpha.800'}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <FieldErrorText>{descriptionErrorMessage}</FieldErrorText>
                        </Field.Root>

                        <Field.Root>
                        <Field.Label color={'whiteAlpha.800'}>Price</Field.Label>
                        <Input
                            placeholder="Enter price"
                            type="number"
                            id="price"
                            name="price"
                            borderColor={'gray.700'}
                            color={'whiteAlpha.800'}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <FieldErrorText>{priceErrorMessage}</FieldErrorText>
                        </Field.Root>

                        <Field.Root>
                        <Field.Label color={'whiteAlpha.800'}>Subject</Field.Label>
                        <Input
                            placeholder="Enter subject"
                            type="text"
                            id="subject"
                            name="subject"
                            borderColor={'gray.700'}
                            color={'whiteAlpha.800'}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <FieldErrorText>{subjectErrorMessage}</FieldErrorText>
                        </Field.Root>
                    </Stack>
                    </Card.Body>
                    <Card.Footer justifyContent={'flex-end'}>
                    <Button type="submit" variant={'solid'} color={'whiteAlpha.800'} onClick={handleCreateCourse}>
                        Create
                    </Button>
                    </Card.Footer>
                </Card.Root>
                </Box>
    )
}