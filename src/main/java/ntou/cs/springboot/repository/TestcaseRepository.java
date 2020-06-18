package ntou.cs.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ntou.cs.springboot.entity.Testcase;

@Repository
public interface TestcaseRepository extends MongoRepository<Testcase, String> {

	List<Testcase> findByIdentification(String identification);

}
