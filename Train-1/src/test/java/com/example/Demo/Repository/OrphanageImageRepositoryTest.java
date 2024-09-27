package com.example.Demo.Repository;

import com.example.Demo.Model.OrphanageImage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrphanageImageRepositoryTest {

    @Mock
    private OrphanageImageRepository orphanageImageRepository;

    @Test
    public void testFindOrphanageImageByOrphanageId() {
        String orphanageId = "sampleOrphanageId";
        List<OrphanageImage> orphanageImages = new ArrayList<>();
        orphanageImages.add(new OrphanageImage());
        orphanageImages.add(new OrphanageImage());

        when(orphanageImageRepository.findOrphanageImageByOrphanageId(orphanageId)).thenReturn(orphanageImages);

        List<OrphanageImage> result = orphanageImageRepository.findOrphanageImageByOrphanageId(orphanageId);

        assertEquals(2, result.size());
        verify(orphanageImageRepository, times(1)).findOrphanageImageByOrphanageId(orphanageId);
    }

    @Test
    public void testFindOrphanageImageByOrphanageId_NoImagesFound() {
        String orphanageId = "sampleOrphanageId";
        List<OrphanageImage> orphanageImages = new ArrayList<>();

        when(orphanageImageRepository.findOrphanageImageByOrphanageId(orphanageId)).thenReturn(orphanageImages);

        List<OrphanageImage> result = orphanageImageRepository.findOrphanageImageByOrphanageId(orphanageId);

        assertTrue(result.isEmpty());
        verify(orphanageImageRepository, times(1)).findOrphanageImageByOrphanageId(orphanageId);
    }

    @Test
    public void testDeleteByOrphanageIdAndId() {
        String orphanageId = "sampleOrphanageId";
        String imageId = "sampleImageId";

        orphanageImageRepository.deleteByOrphanageIdAndId(orphanageId, imageId);

        verify(orphanageImageRepository, times(1)).deleteByOrphanageIdAndId(orphanageId, imageId);
    }

    @Test
    public void testDeleteByOrphanageIdAndId_ImageNotFound() {
        String orphanageId = "sampleOrphanageId";
        String imageId = "nonExistingImageId";

        // Assuming the repository does not find any image with the given orphanageId and imageId
        doNothing().when(orphanageImageRepository).deleteByOrphanageIdAndId(orphanageId, imageId);

        // In this case, the method should not throw any exceptions and simply return
        assertDoesNotThrow(() -> orphanageImageRepository.deleteByOrphanageIdAndId(orphanageId, imageId));

        verify(orphanageImageRepository, times(1)).deleteByOrphanageIdAndId(orphanageId, imageId);
    }
}
