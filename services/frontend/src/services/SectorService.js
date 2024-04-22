import { useApi } from '../hooks/useApi';

const sectorService = () => {
  const { get } = useApi();
  const MAX_PER_PAGE = 3;

  const fetchHomeSector = async (onSuccess) => {
    const params = {
      'populate[sectors][populate][categories][populate][jobs]': true,
      'populate[sectors][populate][smallImage]': true,
      'populate[sectors][populate][bigImage]': true,
      'populate[sectors][limit]': MAX_PER_PAGE,
    }
    await get('home-sector', { onSuccess, params });
  };

  const fetchSectorJobCount = async (onSuccess) => {
    await get('sectors/jobCount', { onSuccess });
  }

  const fetchSectors = async (onSuccess) => {
    const sectors = await get('sectors', { onSuccess });
    return sectors;
  }

  return {
    fetchHomeSector,
    fetchSectorJobCount,
    fetchSectors,
  }
};

export default sectorService;