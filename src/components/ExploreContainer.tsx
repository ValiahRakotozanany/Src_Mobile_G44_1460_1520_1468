import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container" >
      <div id="vehicule"></div>
      <table align="center">
        <tr>
          <th>id</th>
          <th>marque</th>
          <th>numéro</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Toyota</td>
          <td>1212TBA</td>
        </tr>
      </table>
    </div>
  );
};

export default ExploreContainer;
