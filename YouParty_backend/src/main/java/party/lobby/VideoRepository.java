package party.lobby;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
	List<VideoEntity> findAllByOrderByIdAsc();
}
