// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.scss";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Diet</Title>
        <Link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        {/* <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-3+FwJ+39UM+2HfKZbT9Tf0rTfU6KxU6PCJY6OhpY6YD0+pI+UZ/KKj10c77CQwGZJTp3MEq3XpWbLHmO1RkKCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}
        <Link rel="stylesheet" href="https://unpkg.com/@icon/font-awesome-solid/font-awesome-solid.css"/>

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/profile.jpeg" />
      </Head>
      <Body>
        <div class="row g-0 bg-black ">
          <div class="col ">
            <Suspense>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
        <Scripts />
      </Body>
    </Html>
  );
}
