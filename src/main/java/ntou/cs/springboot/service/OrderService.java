package ntou.cs.springboot.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ntou.cs.springboot.entity.Order;
import ntou.cs.springboot.entity.OrderRequest;
import ntou.cs.springboot.entity.QueryParameter;
import ntou.cs.springboot.exception.NotFoundException;
import ntou.cs.springboot.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;

	public OrderService(OrderRepository repository) {
		this.repository = repository;
	}

	public Order getOrder(String id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundException("Can't find product."));
	}

	public Order createOrder(OrderRequest request) {
		Order order = new Order();
		order.setMissingId(request.getMissingId());
		order.setMissingContent(request.getMissingContent());
		order.setMissingNumber(request.getMissingNumber());
		order.setRepairDescription(request.getRepairDescription());
		order.setAssignee(request.getAssignee());
		order.setStatus(request.getStatus());
		order.setSeverity(request.getSeverity());

		return repository.insert(order);
	}

	public Order replaceOrder(String missingId, OrderRequest request) {
		List<Order> oldOrder = findOrder(missingId);
		repository.deleteById(oldOrder.get(0).getId());
		return createOrder(request);
	}
	
	public List<Order> findOrder(String missingId) {
		return repository.findByMissingId(missingId);
	}

	public void deleteOrder(String id) {
		repository.deleteById(id);
	}
	
	public void deleteAllOrder() {
		repository.deleteAll();
	}

	public List<Order> getOrders(QueryParameter param) {
		String status = param.getStatus();
		String severity = param.getSeverity();
		System.out.println("status = " + status);
		System.out.println("severity = " + severity);
		
		Sort sort = null;
		Sort.Direction direction = Sort.Direction.ASC;
		
		
		if (status != null && severity == null) {
			System.out.println("status");
			sort = Sort.by(direction, "status");
		} else if (status == null && severity != null) {
			System.out.println("severity");
			sort = Sort.by(direction, "severity");
		} else {
			System.out.println("no");
			sort = Sort.by(direction, "missingId");
		}
		
		return repository.findAll(sort);
	}

}
