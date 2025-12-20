const ThumbnailItem = ({imageDetails, onClickThumbnail}) => (
  <li>
    <button type="button" onClick={() => onClickThumbnail(imageDetails.id)}>
      <img src={imageDetails.thumbnailUrl} alt="thumbnail" />
    </button>
  </li>
)
export default ThumbnailItem
