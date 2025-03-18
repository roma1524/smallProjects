import { useAppDispatch } from "@/common/hooks";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";
import { createTodolist } from "@/features/todolists/model/todolists-slice";
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolistHandler = (title: string) => {
    dispatch(createTodolist(title));
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolistHandler} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};
