import { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { useSession } from "../../state/auth";
import { GlassCard } from "../_layout/GlassCard";
import { Page } from "../_layout/Page";

type HomeComponentProps = PropsWithChildren<{
  className?: string;
}>;

const HomeComponent: FC<HomeComponentProps> = (props) => (
  <Page>
    <div className={props.className}>
      <GlassCard>
        <h2 className="card-title">Notice</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          pulvinar id leo id egestas. Duis enim nisl, ornare vitae luctus id,
          lobortis condimentum libero. Mauris ullamcorper accumsan ex, id
          facilisis felis. Phasellus feugiat auctor placerat. Nam id nisi vitae
          augue scelerisque efficitur. Sed pretium, leo at dictum placerat,
          ligula dolor suscipit leo, eget iaculis mi nibh eget nisi. Mauris odio
          sem, porttitor a facilisis eu, vehicula et dolor. Aliquam erat
          volutpat. Donec vel risus ultricies, dignissim mauris sed, posuere
          sapien. Nullam ac tortor felis. Phasellus egestas laoreet dolor eget
          egestas. Maecenas fermentum vel tellus at elementum.
        </p>

        <p>
          Suspendisse commodo lacus eget lacus semper varius. Nunc felis mi,
          elementum quis erat consectetur, blandit varius lectus. Donec libero
          mi, fringilla semper sollicitudin ac, feugiat non elit. Etiam ligula
          sem, dictum id erat ut, semper hendrerit dolor. Etiam vitae purus id
          nunc consectetur pharetra a quis sapien. Orci varius natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque
          varius scelerisque ultricies. Curabitur eget pharetra nibh. Morbi
          maximus tincidunt justo eu efficitur. Nunc tincidunt condimentum leo,
          vel commodo risus pellentesque sit amet. Proin vel quam orci.
          Curabitur consequat hendrerit ligula vitae gravida.
        </p>
      </GlassCard>
    </div>
  </Page>
);

const StyledHomeComponent = styled(HomeComponent)`
  .card-title {
    margin-bottom: 12px;
  }

  p {
    line-height: 1.5;
    margin: 12px 0;
  }
`;

export type HomeProps = PropsWithChildren<unknown>;

export const Home: FC<HomeProps> = (props) => {
  const user = useSession();
  console.log(user);

  return <StyledHomeComponent {...props} />;
};
