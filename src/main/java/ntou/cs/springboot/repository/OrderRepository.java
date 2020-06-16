package ntou.cs.springboot.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ntou.cs.springboot.entity.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

	List<Order> findByStatus(String status, Sort sort);
	
	List<Order> findBySeverity(String severity, Sort sort);
	
	List<Order> findByStatusAndSeverity(String status, String severity, Sort sort);
	
	List<Order> findByMissingId(String missingId);

}
